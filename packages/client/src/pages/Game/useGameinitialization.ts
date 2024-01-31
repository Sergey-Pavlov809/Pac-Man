import * as React from 'react'
import { useEffect } from 'react'
import { Boundary } from './Boundary'
import { Player } from './Player'
import { Vector } from './types'

import { map, mapElements } from './mapsUtils'
import { Pellet } from './Pellet'
import { Ghost } from './Ghost'
import { PowerUp } from './Power'

const gameWidth = 440
const gameHeight = 520

export const useGameinitialization = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  scoreRef: React.RefObject<HTMLCanvasElement>
): void => {
  const boundaries: Boundary[] = []
  const pellets: Pellet[] = []
  let totalScore = 0
  const powerUps: PowerUp[] = []

  let animationId: number

  const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
  }

  let lastKey: string

  const handleKeyDown = ({ keyCode }: { keyCode: number }): void => {
    switch (keyCode) {
      case 87:
        keys.w.pressed = true
        lastKey = 'w'
        break
      case 65:
        keys.a.pressed = true
        lastKey = 'a'
        break
      case 83:
        keys.s.pressed = true
        lastKey = 's'
        break
      case 68:
        keys.d.pressed = true
        lastKey = 'd'
        break
    }
  }

  const handleKeyUp = ({ keyCode }: { keyCode: number }): void => {
    switch (keyCode) {
      case 87:
        keys.w.pressed = false
        break
      case 65:
        keys.a.pressed = false
        break
      case 83:
        keys.s.pressed = false
        break
      case 68:
        keys.d.pressed = false
        break
    }
  }

  function circleCollidesWithRectangle({
    circle,
    rectangle,
  }: {
    circle: { position: Vector; radius: number; velocity: Vector }
    rectangle: Boundary
  }): boolean {
    const padding = Boundary.width / 2 - circle.radius - 1
    return (
      circle.position.y - circle.radius + circle.velocity.y <=
        rectangle.position.y + rectangle.height + padding &&
      circle.position.x + circle.radius + circle.velocity.x >=
        rectangle.position.x - padding &&
      circle.position.y + circle.radius + circle.velocity.y >=
        rectangle.position.y - padding &&
      circle.position.x - circle.radius + circle.velocity.x <=
        rectangle.position.x + rectangle.width + padding
    )
  }

  function animate(
    ctx: CanvasRenderingContext2D,
    player: Player,
    ghosts: Ghost[]
  ): void {
    animationId = requestAnimationFrame(() => animate(ctx, player, ghosts))
    ctx.clearRect(0, 0, gameWidth, gameHeight)

    const { w, a, s, d } = keys

    if (w.pressed && lastKey === 'w') {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          circleCollidesWithRectangle({
            circle: { ...player, velocity: { x: 0, y: -5 } },
            rectangle: boundary,
          })
        ) {
          player.velocity.y = 0
          break
        } else {
          player.velocity.y = -5
        }
      }
    } else if (a.pressed && lastKey === 'a') {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          circleCollidesWithRectangle({
            circle: { ...player, velocity: { x: -5, y: 0 } },
            rectangle: boundary,
          })
        ) {
          player.velocity.x = 0
          break
        } else {
          player.velocity.x = -5
        }
      }
    } else if (s.pressed && lastKey === 's') {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          circleCollidesWithRectangle({
            circle: { ...player, velocity: { x: 0, y: 5 } },
            rectangle: boundary,
          })
        ) {
          player.velocity.y = 0
          break
        } else {
          player.velocity.y = 5
        }
      }
    } else if (d.pressed && lastKey === 'd') {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          circleCollidesWithRectangle({
            circle: { ...player, velocity: { x: 5, y: 0 } },
            rectangle: boundary,
          })
        ) {
          player.velocity.x = 0
          break
        } else {
          player.velocity.x = 5
        }
      }
    }

    for (let i = pellets.length - 1; 0 < i; i--) {
      const pellet = pellets[i]
      const score = scoreRef.current
      pellet.draw()
      if (
        Math.hypot(
          pellet.position.x - player.position.x,
          pellet.position.y - player.position.y
        ) <
        pellet.radius + player.radius
      ) {
        totalScore += 10
        pellets.splice(i, 1)
        if (score) {
          score.innerHTML = String(totalScore)
        }
      }
    }

    if (pellets.length - 1 === 0) {
      cancelAnimationFrame(animationId)
    }

    boundaries.forEach(boundary => {
      boundary.draw()
      if (
        circleCollidesWithRectangle({ circle: player, rectangle: boundary })
      ) {
        player.velocity.x = 0
        player.velocity.y = 0
      }
    })

    player.update()

    ghosts.forEach(ghost => {
      ghost.update()
      const collisions: string[] = []
      boundaries.forEach(boundary => {
        if (
          circleCollidesWithRectangle({
            circle: { ...ghost, velocity: { x: ghost.speed, y: 0 } },
            rectangle: boundary,
          })
        ) {
          collisions.push('right')
        }
        if (
          circleCollidesWithRectangle({
            circle: { ...ghost, velocity: { x: -ghost.speed, y: 0 } },
            rectangle: boundary,
          })
        ) {
          collisions.push('left')
        }
        if (
          circleCollidesWithRectangle({
            circle: { ...ghost, velocity: { x: 0, y: -ghost.speed } },
            rectangle: boundary,
          })
        ) {
          collisions.push('up')
        }
        if (
          circleCollidesWithRectangle({
            circle: { ...ghost, velocity: { x: 0, y: ghost.speed } },
            rectangle: boundary,
          })
        ) {
          collisions.push('down')
        }
      })
      if (collisions.length > ghost.prevCollisions.length) {
        ghost.prevCollisions = collisions
      }
      if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
        if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
        if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
        if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
        if (ghost.velocity.x > 0) ghost.prevCollisions.push('down')

        const pathways = ghost.prevCollisions.filter(collision => {
          return !collisions.includes(collision)
        })

        const direction = pathways[Math.floor(Math.random() * pathways.length)]
        switch (direction) {
          case 'down':
            ghost.velocity.y = ghost.speed
            ghost.velocity.x = 0
            break
          case 'up':
            ghost.velocity.y = -ghost.speed
            ghost.velocity.x = 0
            break
          case 'right':
            ghost.velocity.y = 0
            ghost.velocity.x = ghost.speed
            break
          case 'left':
            ghost.velocity.y = 0
            ghost.velocity.x = -ghost.speed
            break
        }

        ghost.prevCollisions = []
      }
    })

    for (let i = ghosts.length - 1; 0 <= i; i--) {
      const ghost = ghosts[i]
      if (
        Math.hypot(
          ghost.position.x - player.position.x,
          ghost.position.y - player.position.y
        ) <
        ghost.radius + player.radius
      ) {
        if (ghost.scared) {
          ghosts.splice(i, 1)
        } else {
          cancelAnimationFrame(animationId)
        }
      }
    }
    for (let i = powerUps.length - 1; 0 <= i; i--) {
      const powerUp = powerUps[i]
      powerUp.draw()
      if (
        Math.hypot(
          powerUp.position.x - player.position.x,
          powerUp.position.y - player.position.y
        ) <
        powerUp.radius + player.radius
      ) {
        powerUps.splice(i, 1)
        ghosts.forEach(ghost => {
          ghost.scared = true
          setTimeout(() => {
            ghost.scared = false
          }, 5000)
        })
      }
    }
  }

  const createImg = (src: string): CanvasImageSource => {
    const image = new Image()
    image.src = src
    return image
  }

  useEffect(() => {
    const canvas = canvasRef?.current
    const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D
    if (!canvas) {
      return
    }

    canvas.height = gameHeight
    canvas.width = gameWidth

    map.forEach((row, indexRow) => {
      row.forEach((symbol, indexSymbol) => {
        const block = mapElements[symbol]
        if (block) {
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * indexSymbol,
                y: Boundary.height * indexRow,
              },
              ctx,
              image: createImg(block),
            })
          )
        } else if (symbol === '.') {
          pellets.push(
            new Pellet({
              position: {
                x: indexSymbol * Boundary.width + Boundary.width / 2,
                y: indexRow * Boundary.height + Boundary.height / 2,
              },
              ctx,
            })
          )
        } else if (symbol === 'p') {
          powerUps.push(
            new PowerUp({
              position: {
                x: indexSymbol * Boundary.width + Boundary.width / 2,
                y: indexRow * Boundary.height + Boundary.height / 2,
              },
              ctx,
            })
          )
        }
      })
    })

    const player: Player = new Player({
      position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      ctx,
    })
    const ghosts = [
      new Ghost({
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height + Boundary.height / 2,
        },
        velocity: {
          x: Ghost.speed,
          y: 0,
        },
        ctx,
      }),
      new Ghost({
        position: {
          x: Boundary.width + Boundary.width / 2,
          y: Boundary.height * 3 + Boundary.height / 2,
        },
        velocity: {
          x: Ghost.speed,
          y: 0,
        },
        ctx,
        color: 'pink',
      }),
    ]
    animate(ctx, player, ghosts)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
}
