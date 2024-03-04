/**
 * Класс диспетчера геймпада, который обрабатывает события кнопок и стика.
 */
export class GamepadManager {
  private buttonHandlers: { [key: number]: (() => void)[] } = {}
  private stickHandlers: { [key: number]: ((value: number) => void)[] } = {}
  private _stop = true

  public start(): void {
    this._stop = false
  }

  public stop(): void {
    this._stop = true
  }

  /**
   * Обновляет состояние геймпада и запускает соответствующие обработчики событий
   * для нажатия кнопок и движений стика.
   *
   * @return {void}
   */
  public update(): void {
    function fakeGamepad(gp: Gamepad): boolean {
      return gp.axes.filter(value => value === -1).length >= 2
    }

    // Не очень красивое решение, но почему-то мой джостик определялся двумя,
    // причем один из них постоянно имел ложные срабатывания, пришлось так его отфильтровать
    const gamepads = navigator.getGamepads()
    const gamepad = gamepads.find(gp => gp && !fakeGamepad(gp))

    if (!gamepad || this._stop) {
      return
    }

    gamepad.buttons.forEach((button, index) => {
      if (button.pressed && this.buttonHandlers[index]) {
        this.buttonHandlers[index].forEach(handler => handler())
      }
    })

    const maxAbsAxis = gamepad.axes.reduce(
      (max: { axis: number; index: number }, cur: number, index: number) => {
        if (
          Math.abs(cur) > 0.2 &&
          Math.abs(cur) > Math.abs(max.axis) &&
          this.stickHandlers[index]
        ) {
          return { axis: cur, index: index }
        } else {
          return max
        }
      },
      { axis: 0, index: -1 }
    )

    // Если найденный индекс действителен и есть обработчики для этого индекса
    if (maxAbsAxis.index != -1 && this.stickHandlers[maxAbsAxis.index]) {
      // вызовем обработчик с наибольшим значением axis
      this.stickHandlers[maxAbsAxis.index].forEach(handler =>
        handler(maxAbsAxis.axis)
      )
    }
  }

  /**
   * Регистрирует функцию обратного вызова для события нажатия кнопки.
   *
   * @param {number} buttonIndex - Индекс кнопки
   * @param {function} callback - Функция обратного вызова, вызываемая при нажатии кнопки
   * @returns {void}
   */
  public onButtonDown(buttonIndex: number, callback: () => void): void {
    if (!this.buttonHandlers[buttonIndex]) {
      this.buttonHandlers[buttonIndex] = []
    }
    this.buttonHandlers[buttonIndex].push(callback)
  }

  /**
   * Вызывается при перемещении стика.
   *
   * @param {number} stickIndex - Индекс стика
   * @param {Function} callback - Функция обратного вызова, которая будет выполняться при перемещении стика.
   *                             Он принимает единственный параметр — значение, которое представляет положение стика.
   * @return {void}
   */
  public onStickMove(
    stickIndex: number,
    callback: (value: number) => void
  ): void {
    if (!this.stickHandlers[stickIndex]) {
      this.stickHandlers[stickIndex] = []
    }
    this.stickHandlers[stickIndex].push(callback)
  }
}
