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
  radians = 0.75
  openRate = 0.12
  rotation = 0

  constructor({ position, velocity, ctx }: PlayerProps) {
    this.position = position
    this.velocity = velocity
    this.ctx = ctx
  }

  draw(): void {
    this.ctx.save()
    this.ctx.translate(this.position.x, this.position.y)
    this.ctx.rotate(this.rotation)
    this.ctx.translate(-this.position.x, -this.position.y)
    this.ctx.beginPath()
    this.ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians
    )
    this.ctx.lineTo(this.position.x, this.position.y)
    this.ctx.fillStyle = 'yellow'
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }

  rotatePacman(): void {
    if (this.radians < 0 || this.radians > 0.75) {
      this.openRate = -this.openRate
    }
    this.radians += this.openRate

    if (this.velocity.x > 0) {
      this.rotation = 0
    } else if (this.velocity.x < 0) {
      this.rotation = Math.PI
    } else if (this.velocity.y < 0) {
      this.rotation = Math.PI * 1.5
    } else if (this.velocity.y > 0) {
      this.rotation = Math.PI / 2
    }
  }

  update(): void {
    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.rotatePacman()
  }
}
