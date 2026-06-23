const express = require('express'); const r = express.Router(); const c = require('../controllers/transferController');
r.get('/', c.getAll); r.post('/', c.create); r.put('/:id/approve', c.approve);
module.exports = r;
