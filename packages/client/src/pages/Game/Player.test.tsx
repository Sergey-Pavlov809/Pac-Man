import { Player } from './Player'
import { Vector } from './types'

describe('Player Class', () => {
  let player: Player
  let mockContext: CanvasRenderingContext2D

  beforeEach(() => {
    mockContext = {
      save: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      lineTo: jest.fn(),
      fillStyle: '',
      fill: jest.fn(),
      closePath: jest.fn(),
      restore: jest.fn(),
    } as unknown as CanvasRenderingContext2D

    player = new Player({
      position: { x: 60, y: 60 } as Vector,
      velocity: { x: -1, y: -1 } as Vector,
      ctx: mockContext,
    })
  })

  it('должен инициализироваться с правильными свойствами', () => {
    expect(player.position).toEqual({ x: 60, y: 60 })
    expect(player.velocity).toEqual({ x: -1, y: -1 })
    expect(player.ctx).toEqual(mockContext)
    expect(player.radius).toBe(15)
    expect(player.radians).toBe(0.75)
    expect(player.openRate).toBe(0.12)
    expect(player.rotation).toBe(0)
  })

  it('Пакман должен вращаться правильно', () => {
    player.rotatePacman()

    // Проверки значений после вызова rotatePacman
    expect(player.rotation).toEqual(Math.PI)
  })

  it('должно правильно обновлять положение и вращение', () => {
    player.update()

    expect(player.position).toEqual({ x: 59, y: 59 })
    expect(player.rotation).toEqual(Math.PI)
  })
})
