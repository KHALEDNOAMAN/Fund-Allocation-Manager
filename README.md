<div align="center">

# ðŸ¦ Fund Allocation Manager

**Budget Allocation System with Multi-Level Approvals & Fund Transfers**

[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A fund allocation and budget management system with multi-level approval workflows, inter-fund transfers, budget variance analysis, and financial reporting. Supports 5 fund types (Operating, Capital, Project, Reserve, Emergency) with real-time balance tracking.

</div>

---

## âœ¨ Features

- ðŸ¦ **Fund Management** - Create and manage funds with types, budgets, and balance tracking
- ðŸ“ **Allocation Requests** - Submit requests with priority levels (Low/Medium/High/Critical)
- âœ… **Multi-Level Approval** - Department head â†’ Finance manager â†’ CEO approval chain
- ðŸ”„ **Fund Transfers** - Transfer money between funds with audit trail
- ðŸ“Š **Budget Variance** - Budget vs actual analysis with utilization percentages
- ðŸ’° **Real-Time Balances** - Available balance updates on every allocation/transfer
- ðŸ“ˆ **Cash Flow Projections** - Forward-looking fund utilization forecasting

## ðŸ—ï¸ Architecture

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ React Frontendâ”‚â”€â”€â”€â”€â–¶â”‚ Express.js API   â”‚â”€â”€â”€â”€â–¶â”‚ PostgreSQL   â”‚
â”‚ (Dashboard)   â”‚     â”‚ (JWT + Approval) â”‚     â”‚ (3 tables)   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## ðŸ“¡ API Endpoints

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

## ðŸš€ Getting Started

```bash
git clone https://github.com/KHALEDNOAMAN/Fund-Allocation-Manager.git
cd Fund-Allocation-Manager/backend
npm install && cp .env.example .env
npx knex migrate:latest && npx knex seed:run
npm run dev
```

## ðŸ“ License
MIT License - see [LICENSE](LICENSE) file.

---
<div align="center">Built with â¤ï¸ during internship at EduTech Yazilim A.S. - Istanbul, Turkey</div>
