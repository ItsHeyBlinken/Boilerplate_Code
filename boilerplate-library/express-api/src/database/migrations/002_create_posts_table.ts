import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    table.string('title').notNullable()
    table.text('content').notNullable()
    table.string('slug').unique().notNullable()
    table.text('excerpt').nullable()
    table.string('featured_image').nullable()
    table.string('status').defaultTo('draft').notNullable()
    table.boolean('is_published').defaultTo(false).notNullable()
    table.timestamp('published_at').nullable()
    table.integer('view_count').defaultTo(0).notNullable()
    table.integer('like_count').defaultTo(0).notNullable()
    table.integer('comment_count').defaultTo(0).notNullable()
    table.json('metadata').nullable()
    table.timestamps(true, true)
    
    table.index(['user_id'])
    table.index(['slug'])
    table.index(['status'])
    table.index(['is_published'])
    table.index(['published_at'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts')
}