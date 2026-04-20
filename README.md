# ⚡ Electrolyte Bajaj — PCB Data Analysis Dashboard

A full-stack Next.js dashboard for PCB repair data analytics built for Bajaj Auto Limited.

---

## 🚀 Quick Setup Guide

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- npm

---c

## Step 1 — Extract & Setup Project

bash
# Extract the zip file
# Open terminal inside the electrolyte-dashboard folder

# Install all dependencies
npm install


---

## Step 2 — Setup PostgreSQL Database

bash
# Open PostgreSQL (replace 'postgres' with your username if different)
psql -U postgres

# Create database
CREATE DATABASE pcb_dashboard;

# Exit psql
\q

# Run the schema script
psql -U postgres -d pcb_dashboard -f scripts/init-db.sql


---

## Step 3 — Configure Environment

bash
# Copy the example env file
cp .env.local.example .env.local

# Open .env.local and fill in your details:
# DB_PASSWORD=your_actual_postgres_password


Your .env.local should look like:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=pcb_dashboard
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD_HERE


---

## Step 4 — Add Your Logo

bash
# Copy your logo file to:
public/logo.jpeg


---

## Step 5 — Run the Application

bash
npm run dev


Open: *http://localhost:3000*

---

## Step 6 — Login & Upload Data

1. Go to http://localhost:3000
2. Login: admin@bajaj.com / admin123
3. Go to *Upload Data* page
4. Upload your Bajaj_PCB_Dec_25_Data.xlsm file
5. Wait for processing (takes 30-60 seconds for large files)
6. Dashboard will automatically populate with real data! 🎉

---

## 📁 Project Structure


electrolyte-dashboard/
├── pages/
│   ├── api/                    ← Backend API routes
│   │   ├── kpis.js             ← KPI metrics
│   │   ├── status.js           ← OK/NFF breakdown
│   │   ├── components.js       ← Component analysis
│   │   ├── branches.js         ← Branch distribution
│   │   ├── trends.js           ← Monthly trends
│   │   ├── pcb-list.js         ← Master PCB list
│   │   ├── pcb-detail.js       ← Per-PCB analysis
│   │   ├── upload.js           ← Excel upload handler
│   │   └── upload-history.js   ← Upload logs
│   ├── master-table/
│   │   └── [part_code].js      ← PCB detail page (clickable!)
│   ├── _app.js
│   ├── index.js                ← Login page
│   ├── dashboard.js            ← Main dashboard
│   ├── analytics.js            ← Analytics page
│   ├── master-table.js         ← Master table page
│   └── upload.js               ← Upload page
├── components/
│   ├── common/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   └── dashboard/
│       ├── KPICards.jsx
│       ├── StatusCharts.jsx
│       ├── BranchChart.jsx
│       ├── TrendsChart.jsx
│       ├── FilterBar.jsx
│       └── DataTable.jsx
├── lib/
│   └── db.js                   ← PostgreSQL connection
├── scripts/
│   └── init-db.sql             ← Database schema
├── styles/
│   └── globals.css
├── public/
│   └── logo.jpeg               ← Add your logo here!
├── .env.local                  ← Your config (create this!)
├── package.json
└── next.config.js


---

## 🗄️ Database Tables

| Table | Description |
|-------|-------------|
| pcb_master | One row per PCB type with summary |
| pcb_data | All individual repair records |
| component_data | Component consumption from Master_Summary |
| status_data | OK/NFF counts from Master_Summary |
| upload_history | Log of all file uploads |

---

## 📊 Dashboard Pages

| Page | URL | Description |
|------|-----|-------------|
| Login | / | Authentication |
| Dashboard | /dashboard | KPIs, charts, overview |
| Analytics | /analytics | Deep dive charts |
| Master Table | /master-table | All PCB codes list |
| PCB Detail | /master-table/974290 | Per-PCB analysis with all charts |
| Upload | /upload | Excel file upload |

---

## 🔑 Features

- ✅ Real data from Excel — no dummy data
- ✅ Click any PCB code → see detailed charts
- ✅ Branch distribution (which city sends most PCBs)
- ✅ Component consumption analysis
- ✅ OK vs NFF breakdown
- ✅ Monthly repair trends
- ✅ Filter by status, PCB code
- ✅ Export tables to CSV
- ✅ Pagination on all tables
- ✅ Upload history log
- ✅ Live clock in navbar
- ✅ Professional dark navy theme

---

## 🛠️ Tech Stack

- *Frontend*: Next.js 14, React 18, Material UI v5
- *Backend*: Next.js API Routes (Node.js)
- *Database*: PostgreSQL
- *Charts*: Recharts
- *Excel*: xlsx library
- *HTTP*: Axios

---

## ⚠️ Troubleshooting

*"Cannot connect to database"*
→ Make sure PostgreSQL is running and .env.local has correct password

*"Upload failed"*
→ Make sure the file is .xlsx or .xlsm format
→ Check that /tmp/pcb_uploads/ directory exists (auto-created)

*"Charts show no data"*
→ Upload the Excel file first via the Upload page

*Port already in use*
bash
# Use a different port
npm run dev -- -p 3001


---

© 2025 Bajaj Auto Limited · Electrolyte PCB Analytics Platform
