import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { forum_message, forum_reaction, forum_theme } from './models/forum'
const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  dotenv.config({ path: '../../.env' })
}

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: String(POSTGRES_PASSWORD),
  database: POSTGRES_DB,
  dialect: 'postgres',
}
const sequelize = new Sequelize(sequelizeOptions)

const indexes = [
  {
    fields: ['theme_id'],
    unique: false,
  },
]

export const ForumTheme = sequelize.define('ForumTheme', forum_theme, {
  updatedAt: false,
})
export const ForumMessage = sequelize.define('ForumMessage', forum_message, {
  updatedAt: false,
  indexes,
})
export const ForumMessageReaction = sequelize.define(
  'ForumMessageReaction',
  forum_reaction,
  {
    timestamps: false,
    indexes,
  }
)

ForumTheme.hasMany(ForumMessage, {
  foreignKey: 'theme_id',
  onDelete: 'CASCADE',
})
ForumTheme.hasMany(ForumMessageReaction, {
  foreignKey: 'theme_id',
  onDelete: 'CASCADE',
})

export async function dbConnect(): Promise<void> {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
