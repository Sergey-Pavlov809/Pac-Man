import { Vector } from './types'

type PlayerProps = {
  position: Vector
  velocity: Vector
  ctx: CanvasRenderingContext2D
}

export class Player {
  position
  velocity
  radius = 15
  ctx

  constructor({ position, velocity, ctx }: PlayerProps) {
    this.position = position
    this.velocity = velocity
    this.ctx = ctx
  }

  draw(): void {
    this.ctx.beginPath()
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = 'yellow'
    this.ctx.fill()
    this.ctx.closePath()
  }

  update(): void {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
