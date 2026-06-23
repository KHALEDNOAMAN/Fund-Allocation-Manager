exports.seed = async function(knex) {
  await knex('transfers').del(); await knex('allocations').del(); await knex('funds').del();
  await knex('funds').insert([
    { fund_code: 'OP-2026', fund_name: 'Operating Fund 2026', fund_type: 'operating', total_budget: 5000000, allocated_amount: 3200000, available_balance: 1800000, fiscal_year: 2026, description: 'Annual operating budget' },
    { fund_code: 'CAP-2026', fund_name: 'Capital Expenditure Fund', fund_type: 'capital', total_budget: 2000000, allocated_amount: 850000, available_balance: 1150000, fiscal_year: 2026, description: 'Capital investments and infrastructure' },
    { fund_code: 'PRJ-PLAT', fund_name: 'Platform Development', fund_type: 'project', total_budget: 1500000, allocated_amount: 1100000, available_balance: 400000, fiscal_year: 2026, description: 'EduFlow platform v2 development' },
    { fund_code: 'PRJ-AI', fund_name: 'AI/ML Research Project', fund_type: 'project', total_budget: 1200000, allocated_amount: 300000, available_balance: 900000, fiscal_year: 2026, description: 'Machine learning and AI initiatives' },
    { fund_code: 'RSV-2026', fund_name: 'Reserve Fund', fund_type: 'reserve', total_budget: 800000, allocated_amount: 0, available_balance: 800000, fiscal_year: 2026, description: 'Financial reserves for contingencies' },
    { fund_code: 'EMR-2026', fund_name: 'Emergency Fund', fund_type: 'emergency', total_budget: 500000, allocated_amount: 50000, available_balance: 450000, fiscal_year: 2026, description: 'Emergency and disaster recovery' },
  ]);
  await knex('allocations').insert([
    { allocation_number: 'ALLOC-2026-0001', fund_id: 1, department_id: 1, requested_amount: 250000, approved_amount: 250000, purpose: 'Q3 server infrastructure upgrade', priority: 'high', status: 'approved', requested_by: 1, approved_by: 2 },
    { allocation_number: 'ALLOC-2026-0002', fund_id: 3, department_id: 2, requested_amount: 180000, purpose: 'React Native mobile app development', priority: 'medium', status: 'pending', requested_by: 3 },
    { allocation_number: 'ALLOC-2026-0003', fund_id: 4, department_id: 1, requested_amount: 120000, purpose: 'GPT integration research & development', priority: 'high', status: 'pending', requested_by: 1 },
    { allocation_number: 'ALLOC-2026-0004', fund_id: 1, department_id: 6, requested_amount: 75000, purpose: 'Q3 marketing campaign budget', priority: 'medium', status: 'pending', requested_by: 4 },
  ]);
  await knex('transfers').insert([
    { transfer_number: 'TRF-2026-0001', source_fund_id: 5, destination_fund_id: 1, amount: 200000, reason: 'Supplement operating budget for Q3', status: 'completed', requested_by: 1, approved_by: 2 },
  ]);
};
