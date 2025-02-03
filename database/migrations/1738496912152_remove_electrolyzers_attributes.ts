import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'electrolyzers'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('operation_time', 'magnet_avail', 'rotation_rpm', 'power_consume')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
