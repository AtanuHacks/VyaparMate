import { useEffect, useState } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

export default function Analytics() {
  const [stocks, setStocks] = useState([]);
  const [sales, setSales] = useState([
  { amount: 500, date: "2026-03-20" },
  { amount: 800, date: "2026-03-20" },
  { amount: 300, date: "2026-03-21" },
  { amount: 1200, date: "2026-03-21" }
]);

const [payments, setPayments] = useState([
  { status: "Paid" },
  { status: "Paid" },
  { status: "Pending" }
]);

  const fetchData = async () => {
    const stockRes = await axios.get("http://localhost:5000/api/stocks");
    setStocks(stockRes.data);

    // 🔥 These APIs you should create (or adjust)
    const salesRes = await axios.get("http://localhost:5000/api/sales");
    const paymentRes = await axios.get("http://localhost:5000/api/payments");

    setSales(salesRes.data || []);
    setPayments(paymentRes.data || []);
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  /* ---------------- PIE (STOCK DISTRIBUTION) ---------------- */
  const stockData = stocks.map(item => ({
    name: item.name,
    value: item.quantity
  }));

  /* ---------------- PAYMENT PIE ---------------- */
  const paymentData = [
    {
      name: "Paid",
      value: payments.filter(p => p.status === "Paid").length
    },
    {
      name: "Pending",
      value: payments.filter(p => p.status === "Pending").length
    }
  ];

  /* ---------------- DAILY SALES ---------------- */
  const dailySalesMap = {};
  sales.forEach(s => {
    const date = new Date(s.date).toLocaleDateString();
    dailySalesMap[date] = (dailySalesMap[date] || 0) + s.amount;
  });

  const dailyData = Object.keys(dailySalesMap).map(date => ({
    date,
    total: dailySalesMap[date]
  }));

  /* ---------------- MONTHLY SALES ---------------- */
  const monthlyMap = {};
  sales.forEach(s => {
    const d = new Date(s.date);
    const month = `${d.getMonth() + 1}-${d.getFullYear()}`;
    monthlyMap[month] = (monthlyMap[month] || 0) + s.amount;
  });

  const monthlyData = Object.keys(monthlyMap).map(month => ({
    month,
    total: monthlyMap[month]
  }));

  const COLORS = ["#22c55e", "#4ade80", "#86efac", "#16a34a", "#15803d"];
  const PAYMENT_COLORS = ["#22c55e", "#f59e0b"]; // green + yellow

  return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      {/* HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {/* STOCK PIE */}
  <div className="glass card-hover p-4 sm:p-6 rounded-2xl shadow-xl border border-white/40 flex flex-col items-center">
    <h2 className="mb-4 font-semibold text-green-800 text-lg">
      Stock Distribution
    </h2>

<div className="w-full flex justify-center">
  <PieChart width={550} height={300}>
    <Pie data={stockData} dataKey="value" nameKey="name" outerRadius={100} label>
  {stockData.map((_, i) => (
    <Cell key={i} fill={COLORS[i % COLORS.length]} />
  ))}
</Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  </div>

  {/* PAYMENT PIE */}
  <div className="glass card-hover p-4 sm:p-6 rounded-2xl shadow-xl border border-white/40 flex flex-col items-center">
    <h2 className="mb-4 font-semibold text-green-800 text-lg">
      Payment Status
    </h2>

    <div className="w-full flex justify-center">
      <PieChart width={350} height={280}>
        <Pie data={paymentData} dataKey="value" nameKey="name" outerRadius={100} label>
  {paymentData.map((_, i) => (
    <Cell key={i} fill={PAYMENT_COLORS[i]} />
  ))}
</Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  </div>

  {/* DAILY SALES */}
  <div className="glass card-hover p-4 sm:p-6 rounded-2xl shadow-xl border border-white/40">
    <h2 className="mb-4 font-semibold text-green-800 text-lg">
      Daily Sales
    </h2>

    <div className="w-full overflow-x-auto">
      <BarChart width={500} height={300} data={dailyData}>
  <CartesianGrid stroke="#e5e7eb" />   {/* ✅ HERE */}
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip contentStyle={{ borderRadius: "10px" }} />   {/* ✅ HERE */}
  <Bar dataKey="total" fill="#22c55e" radius={[6, 6, 0, 0]} />
</BarChart>
    </div>
  </div>

  {/* MONTHLY SALES */}
  <div className="glass card-hover p-4 sm:p-6 rounded-2xl shadow-xl border border-white/40">
    <h2 className="mb-4 font-semibold text-green-800 text-lg">
      Monthly Sales
    </h2>

    <div className="w-full overflow-x-auto">
      <BarChart width={500} height={300} data={monthlyData}>
  <CartesianGrid stroke="#e5e7eb" />
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip contentStyle={{ borderRadius: "10px" }} />
  <Bar dataKey="total" fill="#22c55e" radius={[6, 6, 0, 0]} />
</BarChart>
    </div>
  </div>

</div>
    </div>
  );
}