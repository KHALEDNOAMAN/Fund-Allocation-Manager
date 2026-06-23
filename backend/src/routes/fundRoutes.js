const express = require('express'); const r = express.Router(); const c = require('../controllers/fundController');
r.get('/', c.getAll); r.get('/:id', c.getById); r.post('/', c.create); r.put('/:id', c.update);
module.exports = r;
