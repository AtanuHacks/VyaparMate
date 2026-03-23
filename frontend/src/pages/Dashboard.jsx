import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import Footer from "../components/layout/Footer";
import { AuthContext } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [stocks, setStocks] = useState([]);
  const [summary, setSummary] = useState({
    totalProducts: 0,
    lowStock: 0,
  });
  const [sales, setSales] = useState({
  today: 0,
  week: 0,
  month: 0,
});

  const fetchStocks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stocks");
      const data = res.data || [];
      setStocks(data);

      const totalProducts = data.length;
      const lowStock = data.filter((i) => i.quantity < 5).length;

      setSummary({ totalProducts, lowStock });
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  useEffect(() => { const loadData = async () => { await fetchStocks(); }; loadData(); }, []);
  const fetchSales = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/transactions");
    const data = res.data || [];

    const now = new Date();

    let today = 0;
    let week = 0;
    let month = 0;

    data.forEach((txn) => {
      const txnDate = new Date(txn.created_at ||txn.date);
      const diffDays = (now - txnDate) / (1000 * 60 * 60 * 24);

      if (diffDays < 1) today += Number(txn.amount);
      if (diffDays < 7) week += Number(txn.amount);
      if (diffDays < 30) month += Number(txn.amount);
    });

    setSales({ today, week, month });

  } catch (err) {
    console.error("Error fetching sales:", err);
  }
};
useEffect(() => { const loadData = async () => { await fetchSales(); }; loadData(); }, []);
  // Priority Data (low qty = high priority)
  const priorityData = stocks
    .map((item) => ({
      name: item.name,
      qty: item.quantity,
      priority: item.quantity < 5 ? 5 - item.quantity : 0,
    }))
    .filter((i) => i.priority > 0)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 7);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-4 pb-10 pt-28 sm:pt-32 flex-grow bg-main">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* TOP HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Welcome back</p>
              <h1 className="text-3xl font-bold text-green-800">My Dashboard</h1>
              {user && (
                <p className="mt-1 text-sm text-green-700 font-medium">
                  Hello, {user.name}
                </p>
              )}
            </div>

            <button
              onClick={fetchStocks}
              className="flex items-center gap-2 px-4 py-2 bg-white shadow rounded-xl hover:scale-105 transition"
            >
              <RefreshCw size={16} /> Refresh
            </button>
          </div>

          {/* SUMMARY + SALES */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="glass rounded-2xl p-6 shadow border border-white/40">
              <p className="text-sm text-gray-500">Total Products</p>
              <h2 className="text-2xl font-bold text-green-700">
                {summary.totalProducts}
              </h2>
            </div>

            <div className="glass rounded-2xl p-6 shadow border border-white/40">
              <p className="text-sm text-gray-500">Low Stock</p>
              <h2 className="text-2xl font-bold text-yellow-600">
                {summary.lowStock}
              </h2>
            </div>

            <div className="glass rounded-2xl p-6 shadow border border-white/40">
              <p className="text-sm text-gray-500">Out of Stock</p>
              <h2 className="text-2xl font-bold text-red-600">
                {stocks.filter((i) => i.quantity === 0).length}
              </h2>
            </div>

                  <div className="glass rounded-2xl p-6 shadow border border-white/40">
                      <p className="text-sm text-gray-500">Today Sales</p>
                      <h2 className="text-2xl font-bold text-green-700">
                        ₹{sales.today}
                      </h2>
                    </div>

                    <div className="glass rounded-2xl p-6 shadow border border-white/40">
                      <p className="text-sm text-gray-500">Weekly Sales</p>
                      <h2 className="text-2xl font-bold text-green-700">
                        ₹{sales.week}
                      </h2>
                    </div>

                    <div className="glass rounded-2xl p-6 shadow border border-white/40">
                      <p className="text-sm text-gray-500">Monthly Sales</p>
                      <h2 className="text-2xl font-bold text-green-700">
                        ₹{sales.month}
                      </h2>
                    </div>
                  </div>

          {/* PRIORITY GRAPH */}
          <div className="glass rounded-2xl shadow-xl p-6 border border-white/40">
            <h2 className="text-lg font-semibold mb-4">
              Purchase Priority (Low Stock Items)
            </h2>

            {priorityData.length === 0 ? (
              <p className="text-sm text-gray-500">
                All items are sufficiently stocked ✅
              </p>
            ) : (
              <div className="w-full h-64">
                <ResponsiveContainer>
                  <BarChart data={priorityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="priority" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* LOW STOCK TABLE */}
          <div className="glass rounded-2xl shadow-xl p-6 border border-white/40">
            <h2 className="text-lg font-semibold mb-4">Low Stock Alerts</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-left">Qty</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {stocks
                    .filter((item) => item.quantity < 5)
                    .map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                            Low
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}