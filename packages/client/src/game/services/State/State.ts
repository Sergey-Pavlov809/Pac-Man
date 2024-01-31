import { GameMode } from '../Game/data'

export class State {
  /** Запущена ли игра. */
  inited = false
  /** Стоит ли игра на паузе. */
  paused = false
  /** Режим отладки. */
  debugging = false

  // Настройки игрового экрана.
  /** Ширина игрового поля в игровых клетках. */
  width = 28 * 4
  /** Высота игрового поля в игровых клетках. */
  height = 31 * 4

  /** Текущий игровой уровень. */
  level = 1
  /** Режим игры. */
  mode = GameMode.Singleplayer

  /** Стартовое количество жизней у игроков. */
  defaultPlayerLives = 2

  /** Состояние первого игрока (жизни). */
  playerOne = {
    lives: this.defaultPlayerLives,
  }
  /** Состояние второго игрока (жизни). */
  playerTwo = {
    lives: this.defaultPlayerLives,
  }

  // Таймауты
  /** Через сколько выдаст ошибку, если игровые ресурсы не загрузились. */
  loadResourcesTimeout = 60000

  /** Через сколько осуществляется попытка отспаунить сущеость, если соответствующее место занято. */
  respawnRetryInterval = 200

  load(): void {
    this.inited = true
    this.paused = false
  }

  unload(): void {
    this.inited = false
    this.reset()
  }

  reset(): void {
    this.paused = false
  }
}
