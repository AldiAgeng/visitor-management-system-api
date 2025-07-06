import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("visitors", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("idcard_num", 50).nullable().unique().index();
    table.string("name", 50).nullable();
    table.string("type", 2).nullable();
    table.text("img_base64").nullable();
    table.text("md5").nullable();
    table.string("passtime", 100).nullable();
    table.string("group_id", 50).nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("visitors");
}

