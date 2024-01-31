import { EventEmitter } from '../EventEmitter/EventEmitter'
import { ScenarioEvent } from './typings'
import {
  type Direction,
  EntityEvent,
  type EntitySettings,
} from '../../entities/Entity/typings'
import { type Game } from '../Game/Game'
import { MapManager } from '../MapManager/MapManager'
import { Terrain } from '../../entities/Terrain/Terrain'
import { playerInitialSettings, PlayerType } from '../../entities/Player/data'
import { PlayerState, type PlayerVariant } from '../../entities/Player/typings'
import { Player } from '../../entities/Player/Player'
import { type Controller } from '../Controller/typings'
import { ControllerEvent } from '../Controller/data'

export { ScenarioEvent }

export class Scenario extends EventEmitter<ScenarioEvent> {
  /** Сервис, который загружает игровые карты. */
  mapManager: MapManager

  /** Призраки на карте. */
  //activeEnemies: GhostEnemy[] = [];

  constructor(private game: Game) {
    super()
    this.mapManager = new MapManager(game)

    this.createTerrain()
    this.createPlayers()
  }

  /** Создаёт статические объекты. */
  createTerrain(): void {
    /** Размещаем объекты на карте */
    const map = this.mapManager.getMap()
    const entities = this.mapManager.mapDataToEntitySettings(map)
    entities.forEach(settings => {
      this.createEntity(settings)
    })
  }

  /** Размещает отдельный статический элемент на карте. */
  createEntity(props: EntitySettings): void {
    const entity = new Terrain(props)
    this.game.addEntity(entity)
    entity.spawn(props)
  }

  /** Создаёт игроков. */
  createPlayers(): void {
    if (this.game.state.mode === 'SINGLEPLAYER') {
      this.createPlayerPacman(PlayerType.Player1)
    } else if (this.game.state.mode === 'MULTIPLAYER') {
      this.createPlayerPacman(PlayerType.Player1)
      this.createPlayerPacman(PlayerType.Player2)
    }
  }

  /** Создаёт отдельного  игрока. */
  createPlayerPacman(playerType: PlayerType = PlayerType.Player1): void {
    const settings = playerInitialSettings[playerType]

    const playerState = this.getPlayerState(playerType)

    const entity = new Player(settings)
    this.game.addEntity(entity)

    entity
      .on(EntityEvent.Spawn, () => {
        // Событиепри появлении
      })
      .on(EntityEvent.Destroyed, () => {
        --playerState.lives

        const playerOneIsOut = this.game.state.playerOne.lives < 0
        const playerTwoIsOut =
          this.game.state.mode === 'SINGLEPLAYER' ||
          this.game.state.playerTwo.lives < 0

        if (playerOneIsOut && playerTwoIsOut) {
          this.emit(ScenarioEvent.GameOver)
        }

        if (playerState.lives >= 0) {
          this.createPlayerPacman(playerType)
        }
      })

    /** Если в двупользовательском режиме у одного из игроков кончаются жизни,
     * мы всё равно его спауним на следующем уровне. */
    if (playerState.lives < 0) {
      playerState.lives = 0
    }
    this.trySpawnPlayer(entity)

    // Если игра окончена, останавливаем игроков
    this.on(ScenarioEvent.GameOver, () => {
      if (entity && entity.spawned) {
        entity.frozen = true
        entity.stop()
      }
    })

    const controller = this.getPlayerController(playerType)
    /** Навешиваем события на котроллер, предварительно почистив старые. */
    controller
      .offAll(ControllerEvent.Move)
      .on(ControllerEvent.Move, (direction: Direction) => {
        entity.move(direction)
      })
      .offAll(ControllerEvent.Stop)
      .on(ControllerEvent.Stop, () => {
        entity.stop()
      })
  }

  getPlayerState(playerType: Player | PlayerVariant): PlayerState {
    return playerType === PlayerType.Player1
      ? this.game.state.playerOne
      : this.game.state.playerTwo
  }

  /** Попытка спаунить игрока. */
  trySpawnPlayer(entity: Player): void {
    entity.spawn()
    // Если позиция для спауна  игрока заблокирована, пробуем ещё раз через некоторое время
    if (!entity.spawned) {
      this.game.loop.setLoopDelay(
        this.trySpawnPlayer.bind(this, entity),
        this.game.state.respawnRetryInterval
      )
    }
  }

  /** Возвращает контроллер в зависимости от режима игры и индекса игрока. */
  getPlayerController(playerType: PlayerType): Controller {
    if (this.game.state.mode === 'MULTIPLAYER') {
      if (playerType === PlayerType.Player1) {
        return this.game.controllerPlayerOne
      } else if (playerType === PlayerType.Player2) {
        return this.game.controllerPlayerTwo
      }
    }

    return this.game.controllerAll
  }
}
