import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name", 50).notNullable();
    table.string("username", 50).notNullable();
    table.string("password", 255).notNullable();
    table.string("role", 13).notNullable().defaultTo("superuser");
    table.string("token", 255);
    table.string("refresh_token", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}

