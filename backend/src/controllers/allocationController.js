const { query, pool } = require('../config/database');
const AppError = require('../utils/AppError');

class AllocationController {
  static async getAll(req, res, next) {
    try {
      const { status, priority, fundId } = req.query;
      const conditions = ['1=1']; const params = []; let idx = 1;
      if (status) { conditions.push(`a.status = $${idx++}`); params.push(status); }
      if (priority) { conditions.push(`a.priority = $${idx++}`); params.push(priority); }
      if (fundId) { conditions.push(`a.fund_id = $${idx++}`); params.push(fundId); }
      const result = await query(
        `SELECT a.*, f.fund_name, f.fund_code FROM allocations a LEFT JOIN funds f ON a.fund_id = f.id WHERE ${conditions.join(' AND ')} ORDER BY a.created_at DESC`,
        params
      );
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }
  static async create(req, res, next) {
    try {
      const { fundId, departmentId, requestedAmount, purpose, priority, notes } = req.body;
      const fund = await query('SELECT available_balance FROM funds WHERE id = $1', [fundId]);
      if (!fund.rows.length) throw new AppError('Fund not found', 404);
      if (parseFloat(fund.rows[0].available_balance) < requestedAmount) throw new AppError('Insufficient fund balance', 400);
      const allocNumber = `ALLOC-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
      const result = await query(
        `INSERT INTO allocations (allocation_number, fund_id, department_id, requested_amount, purpose, priority, status, notes, requested_by) VALUES ($1,$2,$3,$4,$5,$6,'pending',$7,$8) RETURNING *`,
        [allocNumber, fundId, departmentId, requestedAmount, purpose, priority || 'medium', notes, req.user?.id || 1]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }
  static async approve(req, res, next) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const alloc = await client.query('SELECT * FROM allocations WHERE id = $1 AND status = $2', [req.params.id, 'pending']);
      if (!alloc.rows.length) throw new AppError('Allocation not found or not pending', 404);
      const a = alloc.rows[0];
      const approvedAmount = req.body.approvedAmount || a.requested_amount;
      await client.query(
        `UPDATE allocations SET status = 'approved', approved_amount = $1, approved_by = $2, approved_at = NOW(), notes = COALESCE($3, notes) WHERE id = $4`,
        [approvedAmount, req.user?.id || 1, req.body.notes, req.params.id]
      );
      await client.query(
        `UPDATE funds SET allocated_amount = allocated_amount + $1, available_balance = available_balance - $1, updated_at = NOW() WHERE id = $2`,
        [approvedAmount, a.fund_id]
      );
      await client.query('COMMIT');
      res.json({ success: true, data: { message: 'Allocation approved', approvedAmount } });
    } catch (err) { await client.query('ROLLBACK'); next(err); }
    finally { client.release(); }
  }
  static async reject(req, res, next) {
    try {
      const result = await query(
        `UPDATE allocations SET status = 'rejected', approved_by = $1, notes = $2, updated_at = NOW() WHERE id = $3 AND status = 'pending' RETURNING *`,
        [req.user?.id || 1, req.body.notes || '', req.params.id]
      );
      if (!result.rows.length) throw new AppError('Allocation not found or not pending', 404);
      res.json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }
  static async disburse(req, res, next) {
    try {
      const result = await query(
        `UPDATE allocations SET status = 'disbursed', disbursed_at = NOW() WHERE id = $1 AND status = 'approved' RETURNING *`,
        [req.params.id]
      );
      if (!result.rows.length) throw new AppError('Allocation not found or not approved', 404);
      res.json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }
}
module.exports = AllocationController;
