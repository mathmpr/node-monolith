exports.up = function(knex) {
    return knex.schema.createTable('contacts', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable()
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('photo').notNullable();
        table.text('address');
        table.timestamps(true, true);

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('contacts');
};
