exports.up = function(knex) {
  return knex.schema.createTable('allocations', (t) => {
    t.increments('id').primary(); t.string('allocation_number', 50).unique().notNullable();
    t.integer('fund_id').notNullable().references('id').inTable('funds');
    t.integer('department_id'); t.decimal('requested_amount', 15, 2).notNullable();
    t.decimal('approved_amount', 15, 2); t.text('purpose').notNullable();
    t.string('priority', 20).defaultTo('medium').checkIn(['low', 'medium', 'high', 'critical']);
    t.string('status', 20).defaultTo('pending').checkIn(['draft', 'pending', 'approved', 'rejected', 'disbursed']);
    t.integer('requested_by').notNullable(); t.integer('approved_by'); t.timestamp('approved_at'); t.timestamp('disbursed_at');
    t.text('notes'); t.timestamps(true, true);
  });
};
exports.down = (knex) => knex.schema.dropTable('allocations');
