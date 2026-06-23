require('dotenv').config();
const app = require('./src/app');
app.listen(process.env.PORT || 3006, () => console.log(`Fund Allocation API running on port ${process.env.PORT || 3006}`));
