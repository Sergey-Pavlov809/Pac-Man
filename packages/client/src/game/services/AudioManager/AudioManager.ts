import { EntityEvent } from '../../entities/Entity/typings'
import { type Game } from '../'
import { type SoundPathList } from '../Resources/data'
import {
  type ActivatedSounds,
  isSoundNameInSoundPathList as isSoundNameCorrect,
} from './typings'
import { EventEmitter } from '../EventEmitter/EventEmitter'
import { Ghost } from '../../entities/Ghost/Ghost'
import { Player } from '../../entities/Player/Player'
import { Entity } from '../../entities/Entity/Entity'

export class AudioManager extends EventEmitter {
  private isStopped = false
  private isMuteKeyPressed = false
  private isPauseKeyPressed = false
  context: AudioContext
  /** Хранит все проигрываемые звуки. */
  activatedSounds: ActivatedSounds = {} as ActivatedSounds

  constructor(private game: Game) {
    super()

    this.registerGlobalEvents()
    this.context = this.game.resources.audioContext
  }

  /** Берёт AudioElement из соответствующего сервиса. */
  getSound(sound: keyof typeof SoundPathList): AudioBuffer {
    return this.game.resources.getSound(sound)
  }

  load(): void {
    this.isStopped = false
    this.isMuteKeyPressed = false
    this.isPauseKeyPressed = false
    this.reset()
  }

  unload(): void {
    this.reset()
  }

  /** Останавливает все AudioElement из AudioManager.activeSounds */
  reset(): void {
    this.pauseSoundAll()
    this.activatedSounds = {} as ActivatedSounds
  }

  registerGlobalEvents(): void {
    this.on('levelIntro', () => {
      this.playSound('startMusic')
    })

    this.on('gameOver', () => {
      this.pauseSoundAll()
      //this.playSound('gameOver')
    })

    this.on('pause', ({ isMuteKey = false }) => {
      if (isMuteKey) {
        this.isMuteKeyPressed = !this.isMuteKeyPressed
      } else {
        this.isPauseKeyPressed = !this.isPauseKeyPressed
      }

      // Если mute-режим активирован - кнопка паузы не активна в плане звука.
      // Если пауза активирована - кнопка mute не активна.
      if (
        (this.isMuteKeyPressed && !isMuteKey) ||
        (this.isPauseKeyPressed && isMuteKey)
      ) {
        return
      }

      if (!this.isStopped) {
        this.pauseSoundAll()
        this.isStopped = true
      } else {
        this.isStopped = false
        this.resumeSoundAll()
      }
    })
  }

  /** Подписывает звуки на соответствующие события */
  add(entity: Entity): void {
    const isGhost = entity instanceof Ghost
    const isPlayer = entity instanceof Player

    /** Звуки призрака */
    if (isGhost) {
      entity.on(EntityEvent.GhostMovesToBase, () => {
        this.playSound('ghostReturnToHome')
      })
      entity.on(EntityEvent.GhostFinishedMovingToBase, () => {
        this.stopSound('ghostReturnToHome')
      })
    }

    /** Звуки игрока */
    if (isPlayer) {
      /** Поедание точек */
      entity.on(EntityEvent.PlayerAteFood, () => {
        this.playSound('credit')
      })
      entity.on(EntityEvent.GhostIsFrightened, () => {
        this.playSound('ghostTurnToBlur')
      })
      entity.on(EntityEvent.PlayerAteGhost, () => {
        this.playSound('eatingGhost')
      })
      entity.on(EntityEvent.PlayerCaught, () => {
        this.playSound('miss')
      })
    }
  }

  /** Проигрывает конкретный AudioElement из Resources.soundList. */
  playSound(sound: keyof typeof SoundPathList, resumeTime = 0): void {
    if (this.isStopped) {
      return
    }

    if (this.activatedSounds[sound]?.isPlaying) {
      this.stopSound(sound)
    }

    /**  Получаем звук из списка ресурсов. */
    const audio = this.context.createBufferSource()
    audio.buffer = this.getSound(sound)

    /**  Закцикливаем звук, если нужно. */
    audio.loop = sound === 'ghostReturnToHome'

    /**  Регулировка громкости звука. */
    const gainNode = this.context.createGain()
    const islowVolumeSound = sound === 'ghostTurnToBlur'
    gainNode.gain.value = islowVolumeSound ? 0.4 : 1

    /**  Подключаем звук к выходу с учетом громкости. */
    audio.connect(gainNode)
    gainNode.connect(this.context.destination)

    /**  Запускаем воспроизведение звука */
    audio.start(0, resumeTime)

    /** Web Audio API не хранит данных о состоянии звука, поэтому мы должны это делать самостоятельно. */
    this.activatedSounds[sound] = {
      audio,
      isPlaying: true,
      startTime:
        this.context.currentTime -
        (this.activatedSounds[sound]?.resumeFrom ?? 0),
      resumeFrom: 0,
    }

    audio.onended = (): void => {
      if (!this.isStopped && this.activatedSounds[sound]) {
        this.activatedSounds[sound].isEnded = true
      }
    }
  }

  /** Останавливает конкретный AudioElement из Resources.soundList. */
  stopSound(sound: keyof typeof SoundPathList): void {
    const soundResource = this.activatedSounds[sound]

    if (soundResource?.isPlaying) {
      soundResource.audio.stop()
      soundResource.isPlaying = false
      soundResource.resumeFrom =
        this.context.currentTime - soundResource.startTime
    }
  }

  pauseSound(sound: keyof typeof SoundPathList): void {
    const soundResource = this.activatedSounds[sound]

    if (!this.isStopped && soundResource.isPlaying) {
      this.stopSound(sound)
    }
  }

  pauseSoundAll(): void {
    Object.keys(this.activatedSounds).forEach(soundName => {
      if (isSoundNameCorrect(soundName)) {
        this.pauseSound(soundName)
      }
    })
  }

  resumeSound(sound: keyof typeof SoundPathList): void {
    const soundResource = this.activatedSounds[sound]

    if (!this.isStopped && !soundResource.isPlaying && !soundResource.isEnded) {
      this.playSound(sound, soundResource.resumeFrom)
    }
  }

  resumeSoundAll(): void {
    Object.keys(this.activatedSounds).forEach(soundName => {
      if (isSoundNameCorrect(soundName)) {
        this.resumeSound(soundName)
      }
    })
  }
}
