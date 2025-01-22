/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
    // Create 'user' table
    await knex.schema.createTable('users', (table) => {
      table.increments('id').notNullable().primary();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.string('name', 255).notNullable();
    });
  
    // Create 'friendship' table
    await knex.schema.createTable('friendship', (table) => {
      table.increments('id').notNullable().primary();
      table.integer('user_id').unsigned().notNullable().references('users.id').onUpdate("CASCADE").onDelete('CASCADE');
      table.integer('friend_id').unsigned().notNullable().references('users.id').onUpdate("CASCADE").onDelete('CASCADE');
      table.string('status', 255).notNullable();
      table.datetime('created_at').defaultTo(knex.fn.now());
    });
  
    // Create 'habit' table
    await knex.schema.createTable('habits', (table) => {
      table.increments('id').notNullable().primary();
      table.integer('user_id').unsigned().notNullable().references('users.id').onUpdate("CASCADE").onDelete('CASCADE');
      table.string('habit_name', 255).notNullable();
      table.datetime('created_at').defaultTo(knex.fn.now());
    });
  
    // Create 'habitCompletion' table
    await knex.schema.createTable('habitCompletion', (table) => {
      table.increments('id').notNullable().primary();
      table.integer('habit_id').unsigned().notNullable().references('habits.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.date('completion_date').notNullable();
    });

    await knex.schema.createTable('habitStats', (table) => {
      table.increments('id').notNullable().primary();
      table.date('date').notNullable(); // Primary key as the date
      table.integer('user_id').unsigned().notNullable().references('users.id').onUpdate("CASCADE").onDelete('CASCADE');
      table.integer('total_habits').notNullable(); // Total habits assigned
      table.integer('completed_habits').notNullable(); // Total habits completed
      table.float('completion_percentage').notNullable(); // Completion percentage
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    // Drop tables in reverse order of creation
    await knex.schema.dropTableIfExists('habitCompletion');
    await knex.schema.dropTableIfExists('habits');
    await knex.schema.dropTableIfExists('friendship');
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('habitStats');
  };