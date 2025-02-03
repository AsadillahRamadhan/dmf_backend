import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up () {
    this.schema.alterTable('magnets', (table) => {
      table.string('name').after('id')
    })
    this.schema.alterTable('magnet_arrays', (table) => {
      table.string('name').after('id')
    })
    this.schema.alterTable('dmfs', (table) => {
      table.string('name').after('id')
    })
    this.schema.alterTable('electrolyzers', (table) => {
      table.string('name').after('id')
    })
  }

  public async down () {
    this.schema.alterTable('magnets', (table) => {
      table.dropColumn('name');
    })
    this.schema.alterTable('magnet_arrays', (table) => {
      table.dropColumn('name');
    })
    this.schema.alterTable('dmfs', (table) => {
      table.dropColumn('name');
    })
    this.schema.alterTable('electrolyzers', (table) => {
      table.dropColumn('name');
    })
  }
}
