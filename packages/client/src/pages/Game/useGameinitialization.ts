import * as React from 'react'
import { useEffect } from 'react'
import { Boundary } from './Boundary'
import { Player } from './Player'
import { Vector } from './types'

import { map, mapElements } from './mapsUtils'

const gameWidth = 440
const gameHeight = 520

export const useGameinitialization = (
  ref: React.RefObject<HTMLCanvasElement>
): void => {
  const boundaries: Boundary[] = []

  let animationId: number

  const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
  }

  let lastKey: string

  const handleKeyDown = ({ key }: { key: string }): void => {
    switch (key) {
      case 'w':
        keys.w.pressed = true
        lastKey = 'w'
        break
      case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break
      case 's':
        keys.s.pressed = true
        lastKey = 's'
        break
      case 'd':
        keys.d.pressed = true
        lastKey = 'd'
        break
    }
  }

  const handleKeyUp = ({ key }: { key: string }): void => {
    switch (key) {
      case 'w':
        keys.w.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
      case 's':
        keys.s.pressed = false
        break
      case 'd':
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
    return (
      circle.position.y - circle.radius + circle.velocity.y <=
        rectangle.position.y + rectangle.height &&
      circle.position.x + circle.radius + circle.velocity.x >=
        rectangle.position.x &&
      circle.position.y + circle.radius + circle.velocity.y >=
        rectangle.position.y &&
      circle.position.x - circle.radius + circle.velocity.x <=
        rectangle.position.x + rectangle.width
    )
  }

  function animate(ctx: CanvasRenderingContext2D, player: Player): void {
    animationId = requestAnimationFrame(() => animate(ctx, player))
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
  }
  const createImg = (src: string): CanvasImageSource => {
    const image = new Image()
    image.src = src
    return image
  }

  useEffect(() => {
    const canvas = ref?.current
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

    animate(ctx, player)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
}
