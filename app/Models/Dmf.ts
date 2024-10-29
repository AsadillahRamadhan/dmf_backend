import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Electrolyzer from './Electrolyzer'
import MagnetArray from './MagnetArray'

export default class Dmf extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public operationTime: number

  @column()
  public rotationRpm: number

  @column()
  public powerConsume: number

  @belongsTo(() => Electrolyzer)
  public electrolyzer: BelongsTo<typeof Electrolyzer>

  @hasOne(() => MagnetArray)
  public magnetArray: HasOne<typeof MagnetArray>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
