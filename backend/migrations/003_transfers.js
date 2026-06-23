exports.up = function(knex) {
  return knex.schema.createTable('transfers', (t) => {
    t.increments('id').primary(); t.string('transfer_number', 50).unique().notNullable();
    t.integer('source_fund_id').notNullable().references('id').inTable('funds');
    t.integer('destination_fund_id').notNullable().references('id').inTable('funds');
    t.decimal('amount', 15, 2).notNullable(); t.text('reason');
    t.string('status', 20).defaultTo('pending').checkIn(['pending', 'approved', 'rejected', 'completed']);
    t.integer('requested_by').notNullable(); t.integer('approved_by'); t.timestamps(true, true);
  });
};
exports.down = (knex) => knex.schema.dropTable('transfers');
