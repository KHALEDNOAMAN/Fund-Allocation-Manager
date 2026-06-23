const { query } = require('../config/database');
const AppError = require('../utils/AppError');

class FundController {
  static async getAll(req, res, next) {
    try {
      const result = await query(
        `SELECT *, ROUND((allocated_amount / NULLIF(total_budget, 0)) * 100, 1) AS utilization_pct FROM funds WHERE is_active = true ORDER BY total_budget DESC`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }
  static async getById(req, res, next) {
    try {
      const fund = await query('SELECT * FROM funds WHERE id = $1', [req.params.id]);
      if (!fund.rows.length) throw new AppError('Fund not found', 404);
      const allocations = await query('SELECT * FROM allocations WHERE fund_id = $1 ORDER BY created_at DESC LIMIT 10', [req.params.id]);
      res.json({ success: true, data: { ...fund.rows[0], recentAllocations: allocations.rows } });
    } catch (err) { next(err); }
  }
  static async create(req, res, next) {
    try {
      const { fundCode, fundName, fundType, totalBudget, fiscalYear, departmentId, description } = req.body;
      const result = await query(
        `INSERT INTO funds (fund_code, fund_name, fund_type, total_budget, available_balance, fiscal_year, department_id, description) VALUES ($1,$2,$3,$4,$4,$5,$6,$7) RETURNING *`,
        [fundCode, fundName, fundType, totalBudget, fiscalYear, departmentId, description]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }
  static async update(req, res, next) {
    try {
      const { fundName, totalBudget, description } = req.body;
      const result = await query(
        `UPDATE funds SET fund_name = COALESCE($1, fund_name), total_budget = COALESCE($2, total_budget), available_balance = COALESCE($2, total_budget) - allocated_amount, description = COALESCE($3, description), updated_at = NOW() WHERE id = $4 RETURNING *`,
        [fundName, totalBudget, description, req.params.id]
      );
      if (!result.rows.length) throw new AppError('Fund not found', 404);
      res.json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }
}
module.exports = FundController;
