import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dmfs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.bigInteger('electrolyzer_id').unsigned()
      table.foreign('electrolyzer_id').references('id').inTable('electrolyzers')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('electrolyzer_id')
    })
  }
}
