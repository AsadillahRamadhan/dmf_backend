import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'magnets'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.bigInteger('magnet_array_id').unsigned()
      table.foreign('magnet_array_id').references('id').inTable('magnet_arrays')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('magnet_array_id')
    })
  }
}
