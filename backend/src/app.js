const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fundRoutes = require('./routes/fundRoutes');
const allocationRoutes = require('./routes/allocationRoutes');
const transferRoutes = require('./routes/transferRoutes');
const reportRoutes = require('./routes/reportRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(helmet()); app.use(cors({ origin: process.env.CORS_ORIGIN || '*' })); app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
app.get('/api/health', (req, res) => res.json({ success: true, service: 'Fund Allocation Manager' }));
app.use('/api/funds', fundRoutes); app.use('/api/allocations', allocationRoutes);
app.use('/api/transfers', transferRoutes); app.use('/api/reports', reportRoutes);
app.use((req, res) => res.status(404).json({ success: false, error: { message: 'Route not found' } }));
app.use(errorHandler);
module.exports = app;
