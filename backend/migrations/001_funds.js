exports.up = function(knex) {
  return knex.schema.createTable('funds', (t) => {
    t.increments('id').primary(); t.string('fund_code', 20).unique().notNullable(); t.string('fund_name', 200).notNullable();
    t.string('fund_type', 20).notNullable().checkIn(['operating', 'capital', 'project', 'reserve', 'emergency']);
    t.decimal('total_budget', 15, 2).notNullable(); t.decimal('allocated_amount', 15, 2).defaultTo(0);
    t.decimal('available_balance', 15, 2); t.integer('fiscal_year').notNullable();
    t.integer('department_id'); t.text('description'); t.boolean('is_active').defaultTo(true); t.timestamps(true, true);
  });
};
exports.down = (knex) => knex.schema.dropTable('funds');
