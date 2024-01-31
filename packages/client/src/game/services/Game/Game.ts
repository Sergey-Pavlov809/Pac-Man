import { EventEmitter } from '../EventEmitter/EventEmitter'
import { State } from '../State/State'
import { Loop } from '../Loop/Loop'
import { View } from '../View/View'
import { type Entity } from '../../entities/Entity/Entity'
import { Scenario, ScenarioEvent } from '../Scenario/Scenario'
import { type Controller } from '../Controller/typings'
import {
  BindingConfig,
  KeyBindingsArrows,
  KeyBindingsWasd,
  PointerBindings,
} from '../Controller/KeyBindings'
import { ControllerManager } from '../Controller/ControllerManager'
import { ControllerKeyboard } from '../Controller/ControllerKeyboard'
import { ControllerPointer } from '../Controller/ControllerPointer'
import { Zone } from '../Zone/Zone'
import { Resources, ResourcesEvent } from '../Resources/Resources'
import { Status } from '../Resources/data'

export class Game extends EventEmitter {
  static __instance: Game
  state: State
  resources: Resources
  loop: Loop
  view: View
  zone: Zone
  scenario: Scenario | undefined
  controllerAll: Controller
  controllerPlayerOne: Controller
  controllerPlayerTwo: Controller

  private constructor() {
    super()
    this.state = new State()
    this.resources = new Resources(this)
    this.loop = new Loop()
    this.view = new View(this)
    this.zone = new Zone(this)
    this.controllerAll = this.createController({
      ...KeyBindingsWasd,
      ...KeyBindingsArrows,
    })
    this.controllerPlayerOne = this.createController(KeyBindingsWasd)
    this.controllerPlayerTwo = new ControllerKeyboard(KeyBindingsArrows)
  }

  static create(): Game {
    if (!Game.__instance) {
      Game.__instance = new Game()
    }
    return Game.__instance
  }

  init(root: HTMLElement | null): void {
    this.unload()
    this.load(root)

    if (this.resources.status === Status.Pending) {
      this.resources.on(ResourcesEvent.Loaded, () => {
        this.initScenario()
      })
    } else {
      this.initScenario()
    }
  }

  initScenario(): void {
    /** Инициализируем инстанс сценария */
    this.scenario = new Scenario(this)
      .on(ScenarioEvent.GameOver, async () => {
        //Игра закончена
        console.log('game over')
      })
      .on(ScenarioEvent.MissionAccomplished, async () => {
        //Уровень пройден
        console.log('mission accomplished')
      })
  }

  load(root: HTMLElement | null): void {
    this.state.load()
    this.resources.load()
    this.loop.load()
    this.view.load(root)
    this.controllerAll.load()
    this.controllerPlayerOne.load()
    this.controllerPlayerTwo.load()
  }

  unload(): void {
    this.state.unload()
    this.loop.unload()
    this.view.unload()
    this.zone.unload()
    this.controllerAll.unload()
    this.controllerPlayerOne.unload()
    this.controllerPlayerTwo.unload()
  }

  reset(): void {
    if (this.scenario) {
      delete this.scenario
    }
    this.state.reset()
    this.loop.reset()
    this.view.reset()
    this.zone.reset()
    this.controllerAll.reset()
    this.controllerPlayerOne.reset()
    this.controllerPlayerTwo.reset()
  }

  addEntity(entity: Entity): void {
    this.loop.add(entity)
    this.view.add(entity)
    this.zone.add(entity)
  }

  private createController(keyBinding: BindingConfig): ControllerManager {
    return new ControllerManager([
      new ControllerKeyboard(keyBinding),
      new ControllerPointer({
        pointerBindings: PointerBindings,
        type: 'mouse',
      }),
    ])
  }
}
