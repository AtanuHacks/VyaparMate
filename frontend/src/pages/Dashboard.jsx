import { useEffect, useState } from "react"; import axios from "axios"; import { RefreshCw } from "lucide-react";
import Footer from "../components/layout/Footer";

export default function Dashboard() {

const [stocks, setStocks] = useState([]); const [summary, setSummary] = useState({ totalProducts: 0, lowStock: 0, });

const fetchStocks = async () => { const res = await axios.get("http://localhost:5000/api/stocks"); setStocks(res.data);

// summary calculate
const totalProducts = res.data.length;
const lowStock = res.data.filter(i => i.quantity < 5).length;

setSummary({ totalProducts, lowStock });

};

useEffect(() => {
  (async () => {
    await fetchStocks();
  })();
}, []);

return (
  <div className="flex flex-col min-h-screen">

    {/* MAIN CONTENT */}
    <section className="px-3 sm:px-4 pb-10 pt-28 sm:pt-32 flex-grow bg-main">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
            Dashboard
          </h1>

          <button
            onClick={fetchStocks}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

          <div className="glass card-hover p-5 rounded-2xl border border-white/40 shadow">
            <p className="text-sm text-gray-600">Total Products</p>
            <h2 className="text-2xl font-bold text-green-700">
              {summary.totalProducts}
            </h2>
          </div>

          <div className="glass card-hover p-5 rounded-2xl border border-white/40 shadow">
            <p className="text-sm text-gray-600">Low Stock Items</p>
            <h2 className="text-2xl font-bold text-yellow-600">
              {summary.lowStock}
            </h2>
          </div>

          <div className="glass card-hover p-5 rounded-2xl border border-white/40 shadow">
            <p className="text-sm text-gray-600">Out of Stock</p>
            <h2 className="text-2xl font-bold text-red-600">
              {stocks.filter(i => i.quantity === 0).length}
            </h2>
          </div>

        </div>

        {/* LOW STOCK TABLE */}
        <div className="glass card-hover rounded-2xl shadow-xl p-4 sm:p-6 border border-white/40 mb-6">

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
                  .filter(item => item.quantity < 5)
                  .map(item => (
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

        {/* ALL STOCK PREVIEW */}
        <div className="glass card-hover rounded-2xl shadow-xl p-4 sm:p-6 border border-white/40">

          <h2 className="text-lg font-semibold mb-4">Stock Overview</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
                <tr>
                  <th className="p-2">Item</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Qty</th>
                </tr>
              </thead>

              <tbody>
                {stocks.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">₹{item.price}</td>
                    <td className="p-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>

    {/* FOOTER */}
    <Footer />

  </div>
); }