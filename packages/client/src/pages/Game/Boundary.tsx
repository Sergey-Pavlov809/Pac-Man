import { Vector } from './types'

type BoundaryProps = {
  position: Vector
  ctx: CanvasRenderingContext2D
}

export class Boundary {
  static width = 40
  static height = 40
  position
  width
  height
  ctx

  constructor({ position, ctx }: BoundaryProps) {
    this.position = position
    this.width = Boundary.width
    this.height = Boundary.height
    this.ctx = ctx
  }

  draw(): void {
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
