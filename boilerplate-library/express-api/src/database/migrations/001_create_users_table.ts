import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('role').defaultTo('user').notNullable()
    table.boolean('is_active').defaultTo(true).notNullable()
    table.boolean('email_verified').defaultTo(false).notNullable()
    table.string('avatar_url').nullable()
    table.string('phone').nullable()
    table.date('date_of_birth').nullable()
    table.text('bio').nullable()
    table.string('website').nullable()
    table.string('location').nullable()
    table.timestamp('last_login').nullable()
    table.timestamp('email_verified_at').nullable()
    table.timestamps(true, true)
    
    table.index(['email'])
    table.index(['role'])
    table.index(['is_active'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}