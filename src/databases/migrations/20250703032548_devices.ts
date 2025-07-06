import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("devices", (table: Knex.TableBuilder) => {
        table.increments("id").primary();
        table.string('device_key', 50).nullable().unique();
        table.string("group_id").nullable();
        table.string("name", 50).nullable();
        table.string("status", 20).nullable().defaultTo("active");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("devices");
}
