import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'magnet_arrays'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('magnet_avail')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
