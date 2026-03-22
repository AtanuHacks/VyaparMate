import { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import Footer from "../components/layout/Footer";

export default function Transactions() {

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 pt-28 sm:pt-32 pb-16 bg-main">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Transaction History</h1>
          <p className="text-gray-600 text-sm">
            View all your payment records
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          <button
            onClick={fetchTransactions}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Method</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((txn) => (
                  <tr key={txn.id} className="border-t hover:bg-gray-50 transition">

                    {/* Amount */}
                    <td className="px-4 py-3 font-medium text-green-700">
                      ₹{txn.amount}
                    </td>

                    {/* Method */}
                    <td className="px-4 py-3">
                      {txn.method || "UPI"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                        Success
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(txn.created_at).toLocaleString()}
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </section>

      <Footer />
    </>
  );
}