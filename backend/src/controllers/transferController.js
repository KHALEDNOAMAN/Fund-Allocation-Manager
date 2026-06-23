const { query, pool } = require('../config/database');
const AppError = require('../utils/AppError');

class TransferController {
  static async getAll(req, res, next) {
    try {
      const result = await query(
        `SELECT t.*, sf.fund_name AS source_name, sf.fund_code AS source_code, df.fund_name AS dest_name, df.fund_code AS dest_code
         FROM transfers t LEFT JOIN funds sf ON t.source_fund_id = sf.id LEFT JOIN funds df ON t.destination_fund_id = df.id ORDER BY t.created_at DESC`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }
  static async create(req, res, next) {
    try {
      const { sourceFundId, destinationFundId, amount, reason } = req.body;
      if (sourceFundId === destinationFundId) throw new AppError('Source and destination must be different', 400);
      const source = await query('SELECT available_balance FROM funds WHERE id = $1', [sourceFundId]);
      if (!source.rows.length) throw new AppError('Source fund not found', 404);
      if (parseFloat(source.rows[0].available_balance) < amount) throw new AppError('Insufficient source fund balance', 400);
      const transferNumber = `TRF-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
      const result = await query(
        `INSERT INTO transfers (transfer_number, source_fund_id, destination_fund_id, amount, reason, status, requested_by) VALUES ($1,$2,$3,$4,$5,'pending',$6) RETURNING *`,
        [transferNumber, sourceFundId, destinationFundId, amount, reason, req.user?.id || 1]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }
  static async approve(req, res, next) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const transfer = await client.query('SELECT * FROM transfers WHERE id = $1 AND status = $2', [req.params.id, 'pending']);
      if (!transfer.rows.length) throw new AppError('Transfer not found or not pending', 404);
      const t = transfer.rows[0];
      await client.query('UPDATE funds SET available_balance = available_balance - $1, updated_at = NOW() WHERE id = $2', [t.amount, t.source_fund_id]);
      await client.query('UPDATE funds SET total_budget = total_budget + $1, available_balance = available_balance + $1, updated_at = NOW() WHERE id = $2', [t.amount, t.destination_fund_id]);
      await client.query(`UPDATE transfers SET status = 'completed', approved_by = $1, updated_at = NOW() WHERE id = $2`, [req.user?.id || 1, req.params.id]);
      await client.query('COMMIT');
      res.json({ success: true, data: { message: 'Transfer completed' } });
    } catch (err) { await client.query('ROLLBACK'); next(err); }
    finally { client.release(); }
  }
}
module.exports = TransferController;
