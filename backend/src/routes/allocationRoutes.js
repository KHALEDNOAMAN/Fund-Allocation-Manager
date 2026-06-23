const express = require('express'); const r = express.Router(); const c = require('../controllers/allocationController');
r.get('/', c.getAll); r.post('/', c.create); r.put('/:id/approve', c.approve); r.put('/:id/reject', c.reject); r.put('/:id/disburse', c.disburse);
module.exports = r;
