import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("visitor_records", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("group_id", 50).nullable().index();
    table.string("device_key", 50).nullable().index();
    table.string('idcard_num', 50).nullable().index();
    table.string("record_id", 50).nullable().index();
    table.text("img_base64").nullable();
    table.string('time').defaultTo(knex.fn.now());
    table.string('type').nullable();
    table.json('extra').nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("visitor_records");
}

