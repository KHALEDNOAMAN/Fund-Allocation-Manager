const express = require('express'); const r = express.Router(); const c = require('../controllers/reportController');
r.get('/summary', c.fundSummary); r.get('/variance', c.budgetVariance); r.get('/allocations', c.allocationsByPriority);
module.exports = r;
