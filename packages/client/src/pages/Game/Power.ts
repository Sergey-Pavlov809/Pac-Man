type GhostProps = {
  ctx: CanvasRenderingContext2D
  position: { x: number; y: number }
}

export class PowerUp {
  position
  radius = 6
  ctx
  constructor({ position, ctx }: GhostProps) {
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
