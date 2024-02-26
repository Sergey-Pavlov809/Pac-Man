import { type AssetPathList } from './typings'
import sprite from '../../../assets/images/sprite.png'
import credit from '../../../assets/sounds/credit.mp3'
import eating from '../../../assets/sounds/eating.mp3'
import eatingFruit from '../../../assets/sounds/eating-fruit.mp3'
import eatingGhost from '../../../assets/sounds/eating-ghost.mp3'
import ghostNormalMove from '../../../assets/sounds/ghost-normal-move.mp3'
import ghostReturnToHome from '../../../assets/sounds/ghost-return-to-home.mp3'
import ghostTurnToBlur from '../../../assets/sounds/ghost-turn-to-blue.mp3'
import miss from '../../../assets/sounds/miss.mp3'
import startMusic from '../../../assets/sounds/start-music.mp3'

export const timeoutMsg =
  'Не удалось загрузить данные для игры в течение минуты. Загрузка отменена. Попробуйте обновить страницу.'
export const errorMsg =
  'Не удалось загрузить данные для игры. Попробуйте обновить страницу.'

export enum SpriteName {
  ClassicDesignSprite = 'CLASSIC_DESIGN_SPRITE',
}

// Файлы с ресурсами лежат в папке packages/client/assets, а vite копирует их в dist при build
export const ImagePathList = {
  [SpriteName.ClassicDesignSprite]: sprite,
}

export const SoundPathList = {
  credit,
  eating,
  eatingFruit,
  eatingGhost,
  ghostNormalMove,
  ghostReturnToHome,
  ghostTurnToBlur,
  miss,
  startMusic,
} as const

export const assetPathList: AssetPathList = {
  ...ImagePathList,
  ...SoundPathList,
}

export const extensionList = {
  images: ['png', 'svg', 'jpg', 'jpeg', 'gif'],
  sounds: ['mp3'],
}

export enum ResourcesEvent {
  Loaded = 'LOADED',
  Error = 'ERROR',
}

export enum Status {
  Pending = 'Pending',
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Error = 'ERROR',
}
