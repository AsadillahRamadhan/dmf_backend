import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'magnet_arrays'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('dmf_id').unsigned().after('magnet_avail')
      table.foreign('dmf_id').references('id').inTable('dmfs')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('dmf_id')
    })
  }
}
