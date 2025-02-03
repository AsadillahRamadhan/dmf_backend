import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Dmf from './Dmf'

export default class Electrolyzer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasOne(() => Dmf)
  public dmf: HasOne<typeof Dmf>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
