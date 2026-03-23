import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import Footer from "../components/layout/Footer";
import { AreaChart, Area } from "recharts";

export default function Analytics() {
  const [stocks, setStocks] = useState([]);
  const [sales, setSales] = useState([]);
  const [payments, setPayments] = useState([]);
  const [credits, setCredits] = useState([]);

  // ----------------- FETCH DATA -----------------
  const fetchData = async () => {
    try {
      const stockRes = await axios.get("http://localhost:5000/api/stocks");
      setStocks(stockRes.data);

      const transactionRes = await axios.get("http://localhost:5000/api/transactions");
      setSales(transactionRes.data || []);
      setPayments(transactionRes.data || []);

      const creditRes = await axios.get("http://localhost:5000/api/credits");
      setCredits(creditRes.data || []);
    } catch (err) {
      console.error("Failed to fetch analytics data", err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  // ----------------- PROCESS DATA -----------------

  // STOCK
  const stockData = stocks.map(item => ({
    name: item.name,
    value: item.quantity
  }));

  // PAYMENT (Transactions vs Credit)
  const paymentData = [
    { name: "Paid", value: payments.length },
    { name: "Credit", value: credits.length }
  ];

  // DAILY SALES
  const dailySalesMap = {};
  sales.forEach(s => {
    const date = new Date(s.created_at).toLocaleDateString();
    dailySalesMap[date] = (dailySalesMap[date] || 0) + Number(s.amount);
  });

  const dailyData = Object.keys(dailySalesMap).map(date => ({
    date,
    total: dailySalesMap[date]
  }));

  // MONTHLY SALES
  const monthlyMap = {};
  sales.forEach(s => {
    const d = new Date(s.created_at);
    const month = `${d.getMonth() + 1}-${d.getFullYear()}`;
    monthlyMap[month] = (monthlyMap[month] || 0) + Number(s.amount);
  });

  const monthlyData = Object.keys(monthlyMap).map(month => ({
    month,
    total: monthlyMap[month]
  }));

  // COLORS
  const COLORS = ["#22c55e", "#4ade80", "#86efac", "#16a34a", "#15803d"];
  const PAYMENT_COLORS = ["#22c55e", "#f59e0b"];

  return (
    <>
      <section className="pt-28 sm:pt-32 lg:pt-36 px-4 sm:px-6 lg:px-8 bg-main min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* ---------------- CHARTS ---------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* STOCK PIE */}
            <div className="glass p-4 sm:p-6 rounded-2xl shadow-xl border border-white/40">
              <h2 className="mb-4 font-semibold text-green-800 text-lg text-center">
                Stock Distribution
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={stockData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {stockData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* PAYMENT PIE */}
            <div className="glass p-4 sm:p-6 rounded-2xl shadow-xl border border-white/40">
              <h2 className="mb-4 font-semibold text-green-800 text-lg text-center">
                Payment Status
              </h2>

              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={paymentData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {paymentData.map((_, i) => (
                      <Cell key={i} fill={PAYMENT_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* DAILY SALES */}
            <div className="glass p-4 sm:p-6 rounded-2xl shadow-xl border border-white/40">
              <h2 className="mb-4 font-semibold text-green-800 text-lg text-center">
                Daily Sales
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid stroke="#e5e7eb" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* MONTHLY SALES */}
            <div className="glass p-4 sm:p-6 rounded-2xl shadow-xl border border-white/40">
              <h2 className="mb-4 font-semibold text-green-800 text-lg text-center">
                Monthly Sales
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>

                  {/* Gradient Fill */}
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#22c55e"
                    strokeWidth={3}
                    fill="url(#salesGradient)"
                    dot={{ r: 4 }}
                    activeDot={{ r: 7 }}
                    animationDuration={1500}
                  />

                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* ---------------- CREDIT TABLE ---------------- */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-green-800">
              Credit Risk Management
            </h2>

            <button
              onClick={fetchData}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Details</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {credits.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      No credit records found
                    </td>
                  </tr>
                ) : (
                  credits.map((credit) => {
                    let items = [];

                    try {
                      items =
                        typeof credit.invoice_items === "string"
                          ? JSON.parse(credit.invoice_items)
                          : credit.invoice_items || [];
                    } catch {
                      items = [];
                    }

                    return (
                      <tr key={credit.id} className="border-t">
                        <td className="px-4 py-3">{credit.customer_name}</td>

                        <td className="px-4 py-3">
                          ₹{credit.total_amount}
                        </td>

                        <td className="px-4 py-3">
                          {items.length > 0
                            ? items.map((i, idx) => (
                                <div key={idx}>
                                  {i.name} x {i.quantity} ₹{i.price}
                                </div>
                              ))
                            : <span className="text-gray-400">No items</span>}
                        </td>

                        <td className="px-4 py-3">
                          {new Date(credit.created_at).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata"
                          })}
                        </td>
                      </tr>
                    );
                  })
                )}
                </tbody>
            </table>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}