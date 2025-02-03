import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import MagnetArray from './MagnetArray'
import Dmf from './Dmf'
import Electrolyzer from './Electrolyzer'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public electrolyzerId: number

  @column()
  public dmfId: number

  @column()
  public magnetArrayId: number

  @column()
  public operationTime: number

  @column()
  public magnetAvail: boolean

  @column()
  public rotationRpm: number

  @column()
  public powerConsume: number

  @belongsTo(() => MagnetArray)
  public magnetArray: BelongsTo<typeof MagnetArray>

  @belongsTo(() => Dmf)
  public dmf: BelongsTo<typeof Dmf>

  @belongsTo(() => Electrolyzer)
  public electrolyzer: BelongsTo<typeof Electrolyzer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
