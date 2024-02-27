type PelletProps = {
  ctx: CanvasRenderingContext2D
  position: { x: number; y: number }
}

export class Pellet {
  ctx
  position
  radius = 3
  constructor({ position, ctx }: PelletProps) {
    this.position = position
    this.ctx = ctx
  }

  draw(): void {
    this.ctx.beginPath()
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = 'white'
    this.ctx.fill()
    this.ctx.closePath()
  }
}
