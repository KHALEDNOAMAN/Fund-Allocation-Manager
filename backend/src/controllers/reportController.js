const { query } = require('../config/database');
class ReportController {
  static async fundSummary(req, res, next) {
    try {
      const totals = await query('SELECT SUM(total_budget) AS budget, SUM(allocated_amount) AS allocated, SUM(available_balance) AS available, COUNT(*) AS fund_count FROM funds WHERE is_active = true');
      const byType = await query('SELECT fund_type, COUNT(*) AS count, SUM(total_budget) AS budget, SUM(allocated_amount) AS allocated FROM funds WHERE is_active = true GROUP BY fund_type ORDER BY budget DESC');
      res.json({ success: true, data: { totals: totals.rows[0], byType: byType.rows } });
    } catch (err) { next(err); }
  }
  static async budgetVariance(req, res, next) {
    try {
      const result = await query(
        `SELECT fund_code, fund_name, fund_type, total_budget, allocated_amount, available_balance,
          (total_budget - allocated_amount) AS variance, ROUND((allocated_amount / NULLIF(total_budget, 0)) * 100, 1) AS utilization_pct
         FROM funds WHERE is_active = true ORDER BY total_budget DESC`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }
  static async allocationsByPriority(req, res, next) {
    try {
      const result = await query('SELECT priority, status, COUNT(*) AS count, COALESCE(SUM(requested_amount), 0) AS total FROM allocations GROUP BY priority, status ORDER BY priority');
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }
}
module.exports = ReportController;
