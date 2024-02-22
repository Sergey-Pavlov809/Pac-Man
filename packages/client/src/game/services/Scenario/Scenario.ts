import { EventEmitter } from '../EventEmitter/EventEmitter'
import { ScenarioEvent } from './typings'
import {
  Direction,
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
import { Ghost } from '../../entities/Ghost/Ghost'
import { ghostInitialSettings } from '../../entities/Ghost/data'
import { type GhostVariant } from '../../entities/Ghost/typings'
import { TerrainType } from '../../entities/Terrain/data'
import { Food } from '../../entities/Food/Food'
import { FoodType } from '../../entities/Food/data'
import { Life } from '../../entities/Life/Life'
import { LifeType } from '../../entities/Life/data'
import { ScoreType } from '../../entities/Score/data'
import { Score } from '../../entities/Score/Score'
import { UIElementSettings } from '../../entities/UIElement/typings'

export { ScenarioEvent }

export class Scenario extends EventEmitter<ScenarioEvent> {
  /** Сервис, который загружает игровые карты. */
  mapManager: MapManager
  /** Игроки на карте. */
  player1: Player | null
  player2: Player | null

  /** Призраки на карте. */
  ghosts: Ghost[] = []

  /** Ворота базы на карте. */
  gates: Terrain[] = []

  /** Жизни на карте. */
  life1: Life[] = []
  life2: Life[] = []

  /** Очки на карте. */
  score: Score | null
  score1: Score | null
  score2: Score | null

  /** Количество еды на карте. */
  amountOfFoodLeft = 0

  constructor(private game: Game) {
    super()
    this.mapManager = new MapManager(game)
    this.player1 = null
    this.player2 = null
    this.score = null
    this.score1 = null
    this.score2 = null

    this.createTerrain()
  }

  /** Создаёт статические объекты. */
  createTerrain(): void {
    /** Размещаем объекты на карте */
    const map = this.mapManager.getMap()
    const entities = this.mapManager.mapDataToEntitySettings(map)
    entities.forEach(settings => {
      switch (settings.type) {
        case 'pacman':
          this.createPlayer(settings)
          break
        case 'ghost':
          this.createGhost(settings)
          break
        default:
          this.createEntity(settings)
      }
    })
  }

  resetPosition(): void {
    ;[this.player1, this.player2, ...this.ghosts].forEach(entity =>
      entity?.despawn()
    )

    this.player1 = null
    this.player2 = null
    this.ghosts = []

    const map = this.mapManager.getMap()
    const entities = this.mapManager.mapDataToEntitySettings(map)
    entities.forEach(settings => {
      switch (settings.type) {
        case 'pacman':
          this.createPlayer(settings)
          break
        case 'ghost':
          this.createGhost(settings)
          break
      }
    })
  }

  /** Размещает отдельный статический элемент на карте. */
  createEntity(props: EntitySettings): void {
    let entity
    switch (props.type) {
      case 'food':
        entity = new Food(props)
        ++this.amountOfFoodLeft
        break
      case 'life':
        if (
          props.variant === LifeType.Life1 &&
          this.game.state.playerOne.lives < this.game.state.defaultPlayerLives
        ) {
          this.game.state.playerOne.lives++
          entity = new Life(props)
          this.life1.push(entity)
        } else if (
          this.game.state.mode === 'MULTIPLAYER' &&
          props.variant === LifeType.Life2 &&
          this.game.state.playerTwo.lives < this.game.state.defaultPlayerLives
        ) {
          this.game.state.playerTwo.lives++
          entity = new Life(props)
          this.life2.push(entity)
        } else {
          return
        }

        break
      case 'score':
        if (props.variant === ScoreType.Score1) {
          entity = new Score(props as UIElementSettings)
          this.score1 = entity
        } else if (
          this.game.state.mode === 'MULTIPLAYER' &&
          (props.variant === ScoreType.Score2 ||
            props.variant === ScoreType.Score)
        ) {
          entity = new Score(props as UIElementSettings)
          if (props.variant === ScoreType.Score) {
            this.score = entity
          } else {
            this.score2 = entity
          }
        } else {
          return
        }

        break
      default:
        entity = new Terrain(props)
        if (entity.variant === TerrainType.Gate) {
          this.gates.push(entity)
        }
        break
    }

    this.game.addEntity(entity)

    entity.spawn(props)
  }

  /** Создаем призраков. */
  createGhost(props: EntitySettings): void {
    const { variant, ...restProps } = props
    const settings = {
      ...ghostInitialSettings[variant as GhostVariant],
      variant: variant as GhostVariant,
      ...restProps,
    }
    const entity = new Ghost(settings)
    this.game.addEntity(entity)
    this.ghosts.push(entity)

    entity.on(EntityEvent.openGate, () => {
      this.gates.forEach(gate => gate.openGate())
    })

    entity.spawn(props)
  }

  /** Создаёт игроков. */
  createPlayer(playerSettings: EntitySettings = {} as EntitySettings): void {
    const { variant } = playerSettings as { variant: PlayerType }
    if (variant === PlayerType.Player1) {
      this.player1 = this.createPlayerPacman(PlayerType.Player1, playerSettings)
    } else if (
      variant === PlayerType.Player2 &&
      this.game.state.mode === 'MULTIPLAYER'
    ) {
      this.player2 = this.createPlayerPacman(PlayerType.Player2, playerSettings)
    }
  }

  /** Создаёт отдельного игрока. */
  createPlayerPacman(
    playerType: PlayerType = PlayerType.Player1,
    playerSettings: EntitySettings
  ): Player {
    const { variant, ...restProps } = playerSettings
    const settings = {
      ...playerInitialSettings[playerType],
      variant: variant as PlayerType,
      ...restProps,
    }

    const playerState = this.getPlayerState(playerType)

    const entity = new Player(settings)
    this.game.addEntity(entity)

    entity
      .on(EntityEvent.Spawn, () => {
        entity.moving = true
      })
      .on(EntityEvent.PlayerCaught, () => {
        ;[this.player1, this.player2, ...this.ghosts].forEach(entity => {
          if (entity) {
            entity.frozen = true
          }
        })
        if (entity.variant === PlayerType.Player1) {
          if (this.life1.length > 0) {
            this.life1[this.life1.length - 1].blink()
          }
        } else {
          if (this.life2.length > 0) {
            this.life2[this.life2.length - 1].blink()
          }
        }
      })
      .on(EntityEvent.GhostIsFrightened, () => {
        this.ghosts.forEach(entity => {
          entity.startle()
        })
      })
      .on(EntityEvent.PlayerAteFood, (food: Food) => {
        food.despawn()
        --this.amountOfFoodLeft

        switch (food.variant) {
          case FoodType.Power:
            if (entity.variant === PlayerType.Player1) {
              this.game.state.playerOne.score += 50
            } else {
              this.game.state.playerTwo.score += 50
            }
            break
          default:
            if (entity.variant === PlayerType.Player1) {
              this.game.state.playerOne.score += 10
            } else {
              this.game.state.playerTwo.score += 10
            }
            break
        }

        this.score1?.render(String(this.game.state.playerOne.score))

        if (this.game.state.mode === 'MULTIPLAYER') {
          this.score2?.render(String(this.game.state.playerTwo.score))
          this.score?.render(
            String(
              this.game.state.playerOne.score + this.game.state.playerTwo.score
            )
          )
        }

        if (this.amountOfFoodLeft === 0) {
          this.emit(ScenarioEvent.MissionAccomplished)
        }
      })
      .on(EntityEvent.PlayerAteGhost, () => {
        if (entity.variant === PlayerType.Player1) {
          this.game.state.playerOne.score += 100
        } else {
          this.game.state.playerTwo.score += 100
        }

        this.score1?.render(String(this.game.state.playerOne.score))

        if (this.game.state.mode === 'MULTIPLAYER') {
          this.score2?.render(String(this.game.state.playerTwo.score))
          this.score?.render(
            String(
              this.game.state.playerOne.score + this.game.state.playerTwo.score
            )
          )
        }
      })
      .on(EntityEvent.Destroyed, () => {
        --playerState.lives
        if (entity.variant === PlayerType.Player1) {
          if (this.life1.length > 0) {
            this.life1[this.life1.length - 1].despawn()
            this.life1.pop()
          }
        } else {
          if (this.life2.length > 0) {
            this.life2[this.life2.length - 1].despawn()
            this.life2.pop()
          }
        }

        const playerOneIsOut = this.game.state.playerOne.lives < 0
        const playerTwoIsOut =
          this.game.state.mode === 'SINGLEPLAYER' ||
          this.game.state.playerTwo.lives < 0

        if (playerOneIsOut && playerTwoIsOut) {
          this.emit(ScenarioEvent.GameOver)
        }

        if (playerState.lives >= 0) {
          this.resetPosition()
        }
      })

    /** Если в двупользовательском режиме у одного из игроков кончаются жизни,
     * мы всё равно его спауним на следующем уровне. */
    if (playerState.lives < 0) {
      playerState.lives = 0
    }
    this.trySpawnPlayer(entity)

    // Если игра проиграна, останавливаем игроков
    this.on(ScenarioEvent.GameOver, () => {
      if (entity && entity.spawned) {
        entity.frozen = true
        entity.stop()
      }
    })

    // Если игра выйграна, останавливаем игроков
    this.on(ScenarioEvent.MissionAccomplished, () => {
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
        entity.turn(direction)
      })
      .offAll(ControllerEvent.Stop)
      .on(ControllerEvent.Stop, () => {
        //entity.stop()
      })

    return entity
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
