type GhostProps = {
  ctx: CanvasRenderingContext2D
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  color?: string
}

export class Ghost {
  static speed = 5
  position
  velocity
  speed = 5
  radius = 15
  color
  prevCollisions: string[]
  scared
  ctx
  constructor({ position, velocity, color = 'red', ctx }: GhostProps) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
    this.color = color
    this.prevCollisions = []
    this.scared = false
    this.ctx = ctx
  }

  draw(): void {
    this.ctx.beginPath()
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = this.scared ? 'blue' : this.color
    this.ctx.fill()
    this.ctx.closePath()
  }

  update(): void {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
