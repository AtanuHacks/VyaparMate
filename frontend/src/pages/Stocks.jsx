import { useState, useEffect } from "react";
import Footer from "../components/layout/Footer";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Plus, Minus, RefreshCw } from "lucide-react";

export default function Stocks() {

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    const res = await axios.get("http://localhost:5000/api/stocks");
    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post("http://localhost:5000/api/stocks", newItem);
    setShowModal(false);
    setNewItem({ name: "", price: "", quantity: "" });
    fetchStocks();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/stocks/${id}`);
    fetchStocks();
  };

  const increaseQty = async (id) => {
    await axios.patch(`http://localhost:5000/api/stocks/increase/${id}`);
    fetchStocks();
  };

  const decreaseQty = async (id, currentQty) => {
    if (currentQty <= 0) return; // 🚫 stop here

    await axios.patch(`http://localhost:5000/api/stocks/decrease/${id}`);
    fetchStocks();
  };

  const getStatus = (qty) => {
    if (qty === 0) return { text: "Out", color: "bg-red-100 text-red-700" };
    if (qty < 5) return { text: "Low", color: "bg-yellow-100 text-yellow-700" };
    return { text: "In Stock", color: "bg-green-100 text-green-700" };
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 pt-24 pb-16">

        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Stock Management</h1>
          <p className="text-gray-600 text-sm">
            Add, view and manage your shop inventory
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          {/* Add Item */}
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium"
          >
            + Add Item
          </button>

          {/* Refresh Button */}
          <button
            onClick={fetchStocks}
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
                <th className="px-4 py-3 text-left">Item</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Remove</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => {
                const status = getStatus(item.quantity);

                return (
                  <tr key={item.id} className="border-t">

                    <td className="px-4 py-3">{item.name}</td>

                    <td className="px-4 py-3 flex items-center gap-2">

                      <button
                        onClick={() => decreaseQty(item.id, item.quantity)}
                        className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-[20px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                      >
                        <Plus size={14} />
                      </button>

                    </td>

                    <td className="px-4 py-3">₹{item.price}</td>

                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${status.color}`}
                      >
                        {status.text}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Item Modal */}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

            <div className="bg-white p-6 rounded-lg w-80">

              <h2 className="text-lg font-semibold mb-4">Add Item</h2>

              <input
                type="text"
                placeholder="Item name"
                className="w-full border p-2 mb-3 rounded"
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Price"
                className="w-full border p-2 mb-3 rounded"
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Quantity"
                className="w-full border p-2 mb-3 rounded"
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: e.target.value })
                }
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={addItem}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Add
                </button>
              </div>

            </div>
          </div>
        )}

      </section>

      <Footer />
    </>
  );
}