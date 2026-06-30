<div align="center">

# 🏦 Fund Allocation Manager

**Budget Allocation System with Multi-Level Approvals & Fund Transfers**

[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A fund allocation and budget management system with multi-level approval workflows, inter-fund transfers, budget variance analysis, and financial reporting. Supports 5 fund types (Operating, Capital, Project, Reserve, Emergency) with real-time balance tracking.

</div>

---

## ✨ Features

- 🏦 **Fund Management** - Create and manage funds with types, budgets, and balance tracking
- 📝 **Allocation Requests** - Submit requests with priority levels (Low/Medium/High/Critical)
- ✅ **Multi-Level Approval** - Department head → Finance manager → CEO approval chain
- 🔄 **Fund Transfers** - Transfer money between funds with audit trail
- 📊 **Budget Variance** - Budget vs actual analysis with utilization percentages
- 💰 **Real-Time Balances** - Available balance updates on every allocation/transfer
- 📈 **Cash Flow Projections** - Forward-looking fund utilization forecasting

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/funds` | List all funds with balances |
| POST | `/api/funds` | Create new fund |
| GET | `/api/allocations` | List allocation requests |
| POST | `/api/allocations` | Submit allocation request |
| PUT | `/api/allocations/:id/approve` | Approve (deducts from fund) |
| PUT | `/api/allocations/:id/reject` | Reject allocation |
| POST | `/api/transfers` | Create fund transfer |
| PUT | `/api/transfers/:id/approve` | Approve transfer |
| GET | `/api/reports/variance` | Budget variance report |

## 🚀 Getting Started

```bash
git clone https://github.com/KHALEDNOAMAN/Fund-Allocation-Manager.git
cd Fund-Allocation-Manager/backend
npm install && cp .env.example .env
npx knex migrate:latest && npx knex seed:run
npm run dev
```

## 📝 License
MIT License - see [LICENSE](LICENSE) file.

---
<div align="center">Built with ❤️ during internship at EduTech Yazilim A.S. - Istanbul, Turkey</div>
