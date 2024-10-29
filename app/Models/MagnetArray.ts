import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Magnet from './Magnet'

export default class MagnetArray extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public magnetAvail: boolean

  @hasMany(() => Magnet)
  public magnet: HasMany<typeof Magnet>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
