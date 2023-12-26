import { Vector } from './types'

type BoundaryProps = {
  position: Vector
  ctx: CanvasRenderingContext2D
  image: CanvasImageSource
}

export class Boundary {
  static width = 40
  static height = 40
  position
  width
  height
  ctx
  image

  constructor({ position, ctx, image }: BoundaryProps) {
    this.position = position
    this.width = Boundary.width
    this.height = Boundary.height
    this.ctx = ctx
    this.image = image
  }

  draw(): void {
    this.ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}
