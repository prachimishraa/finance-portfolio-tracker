# 📈 VaultIQ — Finance Portfolio Tracker

> A modern, dark-themed stock portfolio tracker built with React, TypeScript, and Recharts. Designed to give investors a clean, real-time overview of their holdings, performance, and asset allocation.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Recharts](https://img.shields.io/badge/Recharts-2.5-22C55E?style=flat-square)

---

## 🖥️ Preview

A premium fintech-style dashboard featuring:
- Interactive portfolio performance chart
- Live holdings table with P&L indicators
- Sector allocation donut chart
- Recent transaction activity feed

---

## ✨ Features

- **Portfolio Overview** — Total portfolio value, invested capital, daily P&L, and all-time return at a glance
- **Interactive Chart** — Area chart with 1W / 1M / 3M / 1Y range switcher, dynamically colored green or red based on performance
- **Holdings Table** — View all positions with share count, current price, 24h change, total value, and allocation weight
- **Sector Allocation** — Donut chart breaking down portfolio by sector (Technology, Consumer, Healthcare, Energy, etc.)
- **Recent Activity** — Scrollable feed of recent BUY/SELL transactions with date and value
- **Hover Interactions** — Row highlighting on holdings table for better UX
- **Sticky Navigation** — Clean top nav with market status indicator

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Recharts | Charts (AreaChart, PieChart) |
| Inline CSS | Styling with design tokens |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/prachimishraa/finance-portfolio-tracker.git

# Navigate into the project
cd finance-portfolio-tracker

# Install dependencies
npm install

# Install Recharts
npm install recharts
npm install --save-dev @types/recharts
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
finance-portfolio-tracker/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx          # Main component — all dashboard logic & UI
│   ├── main.tsx         # React entry point
│   ├── App.css          # Base styles
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📊 Dashboard Sections

### 1. Portfolio Hero
Displays total portfolio value with today's gain/loss badge and quick action buttons (Rebalance, Add Funds).

### 2. Stat Cards
Three summary cards showing:
- **Invested Capital** — Total amount put in
- **Total Return** — Absolute and percentage return since inception
- **Today's P&L** — Intraday profit or loss

### 3. Performance Chart
An interactive area chart powered by Recharts. Switch between time ranges (1W, 1M, 3M, 1Y). The chart color dynamically changes to green when the selected period is profitable and red when not.

### 4. Holdings Table
A detailed table of all stock positions including ticker, company name, shares held, current price, 24h change (with color-coded badge), total value, and an inline progress bar showing portfolio weight.

### 5. Allocation Chart
A donut (ring) pie chart showing sector-level diversification across Technology, Consumer, Healthcare, Energy, and Other.

### 6. Recent Activity
A transaction log showing the 5 most recent BUY/SELL orders with ticker, share count, date, and total transaction value.

---

## 🎨 Design

The UI follows a **dark fintech aesthetic** with a custom design token system:

- Background: `#080C18`
- Surface: `#0F1526`
- Accent: `#F5A623` (Amber)
- Positive: `#22C55E` (Green)
- Negative: `#EF4444` (Red)

---

## 📌 Note

This project uses **mock/static data** for demonstration purposes. It was built as a frontend showcase project for a campus placement interview, highlighting skills in React, TypeScript, data visualization, and UI design.

---

## 👤 Author

**Prachi Mishra**
- GitHub: [@prachimishraa](https://github.com/prachimishraa)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
