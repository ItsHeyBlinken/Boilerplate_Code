import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('refresh_tokens', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    table.string('token').unique().notNullable()
    table.timestamp('expires_at').notNullable()
    table.string('device_info').nullable()
    table.string('ip_address').nullable()
    table.boolean('is_revoked').defaultTo(false).notNullable()
    table.timestamp('revoked_at').nullable()
    table.timestamps(true, true)
    
    table.index(['user_id'])
    table.index(['token'])
    table.index(['expires_at'])
    table.index(['is_revoked'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('refresh_tokens')
}