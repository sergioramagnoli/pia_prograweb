/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("notes", (table) => {
      table.bigIncrements().unsigned();
      table.string("title", 80).notNullable();
      table.text("body").notNullable();
      table.string("type").notNullable();
      table.string("owner_id").notNullable();
      table.timestamps(true, true);
    })
    .createTable("users", (table) => {
      table.bigIncrements().unsigned();
      table.string("username").notNullable().unique();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notes").dropTableIfExists("users");
};
