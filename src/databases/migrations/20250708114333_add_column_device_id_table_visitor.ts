import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("visitors", (table: Knex.TableBuilder) => {
    table.integer("device_id", 50).nullable().index();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("visitors", (table: Knex.TableBuilder) => {
    table.dropColumn("device_id");
  });
}

