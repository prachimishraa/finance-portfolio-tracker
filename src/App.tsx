import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value?: number;
    payload?: SeriesPoint;
  }>;
  label?: string | number;
};

const C = {
  bg: "#080C18",
  surface: "#0F1526",
  elevated: "#17203A",
  border: "rgba(255,255,255,0.07)",
  amber: "#F5A623",
  amberDim: "rgba(245,166,35,0.15)",
  green: "#22C55E",
  greenDim: "rgba(34,197,94,0.12)",
  red: "#EF4444",
  redDim: "rgba(239,68,68,0.12)",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  text: "#F8FAFC",
  muted: "#64748B",
  light: "#94A3B8",
};

type SeriesPoint = {
  value: number;
  label: string;
  full: string;
};

type RangeKey = "1W" | "1M" | "3M" | "1Y";

type Holding = {
  ticker: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  value: number;
  alloc: number;
  color: string;
};

type Allocation = {
  name: string;
  value: number;
  color: string;
};

type Transaction = {
  type: "BUY" | "SELL";
  ticker: string;
  shares: number;
  price: number;
  date: string;
};

const generateSeries = (
  days: number,
  start: number,
  vol: number
): SeriesPoint[] => {
  let v = start;
  const out: SeriesPoint[] = [];
  const now = new Date("2026-04-27");

  for (let i = days - 1; i >= 0; i--) {
    v += (Math.random() - 0.47) * vol;
    const d = new Date(now);
    d.setDate(now.getDate() - i);

    out.push({
      value: Math.max(v, start * 0.6),
      label: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      full: d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    });
  }

  return out;
};

const RAW = generateSeries(365, 100000, 900);

const RANGES: Record<RangeKey, SeriesPoint[]> = {
  "1W": RAW.slice(-7),
  "1M": RAW.slice(-30),
  "3M": RAW.slice(-90),
  "1Y": RAW,
};

const HOLDINGS: Holding[] = [
  {
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    shares: 15,
    price: 875.4,
    change: 4.22,
    value: 13131,
    alloc: 26.4,
    color: "#76EE59",
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    shares: 45,
    price: 189.5,
    change: 2.3,
    value: 8527.5,
    alloc: 17.2,
    color: "#A0CFFF",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    shares: 20,
    price: 415.3,
    change: 1.82,
    value: 8306,
    alloc: 16.7,
    color: "#7DD3FC",
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    shares: 25,
    price: 185.2,
    change: 1.1,
    value: 4630,
    alloc: 9.3,
    color: "#FDE68A",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    shares: 30,
    price: 175.6,
    change: -0.94,
    value: 5268,
    alloc: 10.6,
    color: "#C4B5FD",
  },
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    shares: 18,
    price: 245.8,
    change: -2.41,
    value: 4424.4,
    alloc: 8.9,
    color: "#FCA5A5",
  },
];

const ALLOCATION: Allocation[] = [
  { name: "Technology", value: 61.3, color: C.amber },
  { name: "Consumer", value: 18.2, color: C.blue },
  { name: "Healthcare", value: 10.5, color: C.green },
  { name: "Energy", value: 6.1, color: C.purple },
  { name: "Other", value: 3.9, color: C.muted },
];

const TRANSACTIONS: Transaction[] = [
  { type: "BUY", ticker: "NVDA", shares: 5, price: 860.2, date: "Apr 22, 2026" },
  { type: "SELL", ticker: "TSLA", shares: 3, price: 255.4, date: "Apr 19, 2026" },
  { type: "BUY", ticker: "AAPL", shares: 10, price: 185.6, date: "Apr 15, 2026" },
  { type: "BUY", ticker: "MSFT", shares: 5, price: 408.9, date: "Apr 10, 2026" },
  { type: "SELL", ticker: "GOOGL", shares: 8, price: 172.3, date: "Apr 5, 2026" },
];

const usd = (n: number): string =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

const sUSD = (n: number): string =>
  "$" + (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toFixed(0));

const pct = (n: number): string => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

type StatCardProps = {
  label: string;
  value: string;
  sub: string;
  positive?: boolean;
};

function StatCard({ label, value, sub, positive }: StatCardProps) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "22px 24px",
      }}
    >
      <p
        style={{
          color: C.muted,
          fontSize: 11,
          margin: "0 0 10px",
          textTransform: "uppercase",
          letterSpacing: "1.2px",
        }}
      >
        {label}
      </p>

      <p
        style={{
          fontSize: 26,
          fontWeight: 700,
          margin: "0 0 6px",
          color:
            positive === true ? C.green : positive === false ? C.red : C.text,
          letterSpacing: "-0.5px",
        }}
      >
        {value}
      </p>

      <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{sub}</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const point = payload[0]?.payload;
  const value = payload[0]?.value ?? 0;

  return (
    <div
      style={{
        background: C.elevated,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "10px 14px",
      }}
    >
      <p style={{ color: C.muted, fontSize: 11, margin: "0 0 4px" }}>
        {point?.full || label}
      </p>

      <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>
        {usd(Number(value))}
      </p>
    </div>
  );
}

export default function App() {
  const [range, setRange] = useState<RangeKey>("1M");
  const [hovered, setHovered] = useState<number | null>(null);

  const data = RANGES[range];

  const start = data[0].value;
  const end = data[data.length - 1].value;
  const diff = end - start;
  const diffPct = (diff / start) * 100;
  const isUp = diff >= 0;
  const lineColor = isUp ? C.green : C.red;

  const totalValue = HOLDINGS.reduce((s, h) => s + h.value, 0);
  const dayPnL = 847.5;
  const dayPnLPct = 1.73;
  const totalReturn = 9726.9;
  const totalRetPct = 24.35;

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.text,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      <nav
        style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: C.amber,
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#000", fontWeight: 900, fontSize: 16 }}>
              ₿
            </span>
          </div>

          <span style={{ fontWeight: 800, fontSize: 18 }}>VaultIQ</span>
        </div>

        <div style={{ display: "flex", gap: 2 }}>
          {["Dashboard", "Portfolio", "Markets", "Watchlist", "Reports"].map(
            (item) => (
              <span
                key={item}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  color: item === "Portfolio" ? C.text : C.muted,
                  background: item === "Portfolio" ? C.elevated : "transparent",
                  fontWeight: item === "Portfolio" ? 600 : 400,
                }}
              >
                {item}
              </span>
            )
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.green,
              }}
            />
            <span style={{ fontSize: 12, color: C.light }}>NYSE Open</span>
          </div>

          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: C.amberDim,
              border: `2px solid ${C.amber}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: C.amber,
            }}
          >
            JD
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <div>
            <p
              style={{
                color: C.muted,
                fontSize: 12,
                margin: "0 0 8px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              My Portfolio · April 27, 2026
            </p>

            <h1
              style={{
                fontSize: 52,
                fontWeight: 800,
                margin: "0 0 10px",
                letterSpacing: "-2px",
              }}
            >
              {usd(totalValue)}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  background: C.greenDim,
                  border: `1px solid rgba(34,197,94,0.25)`,
                  padding: "4px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.green,
                }}
              >
                ▲ {usd(dayPnL)} &nbsp;({pct(dayPnLPct)})
              </span>

              <span style={{ color: C.muted, fontSize: 13 }}>
                today's gain
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                padding: "10px 22px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: "transparent",
                border: `1px solid ${C.border}`,
                color: C.light,
              }}
            >
              Rebalance
            </button>

            <button
              style={{
                padding: "10px 22px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                background: C.amber,
                border: "none",
                color: "#000",
              }}
            >
              + Add Funds
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <StatCard
            label="Invested Capital"
            value={usd(40000)}
            sub="Across 6 positions"
          />
          <StatCard
            label="Total Return"
            value={`+${usd(totalReturn)}`}
            sub={`${pct(totalRetPct)} all time`}
            positive
          />
          <StatCard
            label="Today's P&L"
            value={`+${usd(dayPnL)}`}
            sub={`+${pct(dayPnLPct)} since open`}
            positive
          />
        </div>

        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            padding: "28px",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 24,
            }}
          >
            <div>
              <p
                style={{
                  color: C.muted,
                  fontSize: 12,
                  margin: "0 0 6px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Portfolio Performance
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: isUp ? C.green : C.red,
                  }}
                >
                  {isUp ? "▲" : "▼"} {pct(Math.abs(diffPct))}
                </span>

                <span style={{ fontSize: 14, color: C.muted }}>
                  {isUp ? "+" : ""}
                  {usd(Math.abs(diff))} this period
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 4,
                background: C.elevated,
                padding: 4,
                borderRadius: 10,
              }}
            >
              {(["1W", "1M", "3M", "1Y"] as RangeKey[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 7,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    background: range === r ? C.amber : "transparent",
                    color: range === r ? "#000" : C.muted,
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={data}
              margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lineColor} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />

              <XAxis
                dataKey="label"
                tick={{ fill: C.muted, fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />

              <YAxis
                tick={{ fill: C.muted, fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={sUSD}
                width={62}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="value"
                stroke={lineColor}
                strokeWidth={2.5}
                fill="url(#areaGrad)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: lineColor,
                  stroke: C.bg,
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 20,
          }}
        >
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              padding: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>
                Holdings
              </h3>

              <span
                style={{
                  fontSize: 11,
                  color: C.muted,
                  background: C.elevated,
                  padding: "3px 10px",
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                }}
              >
                6 positions
              </span>
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr>
                  {["Asset", "Shares", "Price", "24h", "Value", "Weight"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: h === "Asset" ? "left" : "right",
                          color: C.muted,
                          fontWeight: 500,
                          fontSize: 11,
                          paddingBottom: 14,
                          textTransform: "uppercase",
                          letterSpacing: "0.8px",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {HOLDINGS.map((h, i) => (
                  <tr
                    key={h.ticker}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      borderTop: `1px solid ${C.border}`,
                      cursor: "pointer",
                      background: hovered === i ? C.elevated : "transparent",
                    }}
                  >
                    <td style={{ padding: "13px 8px 13px 0" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 9,
                            background: `${h.color}18`,
                            border: `1px solid ${h.color}40`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 800,
                            color: h.color,
                          }}
                        >
                          {h.ticker.slice(0, 2)}
                        </div>

                        <div>
                          <p style={{ margin: 0, fontWeight: 700 }}>
                            {h.ticker}
                          </p>

                          <p
                            style={{
                              margin: 0,
                              fontSize: 10,
                              color: C.muted,
                              marginTop: 2,
                            }}
                          >
                            {h.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td style={{ textAlign: "right", color: C.light }}>
                      {h.shares}
                    </td>

                    <td style={{ textAlign: "right", color: C.light }}>
                      ${h.price.toFixed(2)}
                    </td>

                    <td
                      style={{
                        textAlign: "right",
                        fontWeight: 600,
                        color: h.change >= 0 ? C.green : C.red,
                      }}
                    >
                      <span
                        style={{
                          background: h.change >= 0 ? C.greenDim : C.redDim,
                          padding: "2px 7px",
                          borderRadius: 5,
                          fontSize: 12,
                        }}
                      >
                        {h.change >= 0 ? "▲" : "▼"} {Math.abs(h.change)}%
                      </span>
                    </td>

                    <td style={{ textAlign: "right", fontWeight: 700 }}>
                      {usd(h.value)}
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 40,
                            height: 4,
                            borderRadius: 2,
                            background: C.elevated,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${h.alloc}%`,
                              height: "100%",
                              background: h.color,
                              borderRadius: 2,
                            }}
                          />
                        </div>

                        <span style={{ color: C.light, minWidth: 32 }}>
                          {h.alloc}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: "24px",
              }}
            >
              <h3 style={{ margin: "0 0 18px", fontWeight: 700 }}>
                Allocation
              </h3>

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <PieChart width={110} height={110}>
                  <Pie
                    data={ALLOCATION}
                    cx={50}
                    cy={50}
                    innerRadius={32}
                    outerRadius={52}
                    dataKey="value"
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {ALLOCATION.map((e) => (
                      <Cell key={e.name} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>

                <div style={{ flex: 1 }}>
                  {ALLOCATION.map((a) => (
                    <div
                      key={a.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 2,
                            background: a.color,
                          }}
                        />

                        <span style={{ fontSize: 12, color: C.light }}>
                          {a.name}
                        </span>
                      </div>

                      <span style={{ fontSize: 12, fontWeight: 700 }}>
                        {a.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: "24px",
                flex: 1,
              }}
            >
              <h3 style={{ margin: "0 0 18px", fontWeight: 700 }}>
                Recent Activity
              </h3>

              {TRANSACTIONS.map((t, i) => (
                <div
                  key={`${t.ticker}-${t.date}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "11px 0",
                    borderTop: i > 0 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        padding: "3px 8px",
                        borderRadius: 6,
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        background: t.type === "BUY" ? C.greenDim : C.redDim,
                        color: t.type === "BUY" ? C.green : C.red,
                        border: `1px solid ${
                          t.type === "BUY"
                            ? "rgba(34,197,94,0.3)"
                            : "rgba(239,68,68,0.3)"
                        }`,
                      }}
                    >
                      {t.type}
                    </div>

                    <div>
                      <p style={{ margin: 0, fontWeight: 700 }}>{t.ticker}</p>

                      <p
                        style={{
                          margin: 0,
                          fontSize: 10,
                          color: C.muted,
                          marginTop: 2,
                        }}
                      >
                        {t.shares} shares · {t.date}
                      </p>
                    </div>
                  </div>

                  <span style={{ fontSize: 13, fontWeight: 700 }}>
                    {usd(t.shares * t.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}