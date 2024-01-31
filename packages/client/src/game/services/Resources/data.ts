import { type AssetPathList } from './typings'
import sprite from '../../../assets/images/sprite.png'

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

export enum SoundPathList {}

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
