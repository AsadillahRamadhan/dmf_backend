import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('electrolyzer_id').unsigned()
      table.integer('magnet_array_id').unsigned()
      table.integer('dmf_id').unsigned()
      table.float('operation_time')
      table.boolean('magnet_avail')
      table.float('rotation_rpm')
      table.float('power_consume')
      table.foreign('electrolyzer_id').references('id').inTable('electrolyzers')
      table.foreign('magnet_array_id').references('id').inTable('magnet_arrays')
      table.foreign('dmf_id').references('id').inTable('dmfs')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
