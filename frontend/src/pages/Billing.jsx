import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import axios from "axios";
import { Trash2 } from "lucide-react";
import Footer from "../components/layout/Footer";

export default function Billing() {

  const [stockItems, setStockItems] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showQR, setShowQR] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [paid, setPaid] = useState(false);

  const [search, setSearch] = useState("");

  /* FETCH STOCKS */
  const fetchStocks = async () => {
    const res = await axios.get("http://localhost:5000/api/stocks");
    setStockItems(res.data);
  };

  useEffect(() => {
    (async () => {
      await fetchStocks();
    })();
  }, []);

  /* FILTER */
  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  /* ADD ITEM */
  const addItem = (item) => {

    let qty = quantities[item.id] || 1;

    if (!qty || qty <= 0) {
      alert("Enter valid quantity");
      return;
    }

    const existing = invoiceItems.find(i => i.id === item.id);
    const alreadyAdded = existing ? existing.quantity : 0;

    if (alreadyAdded + qty > item.quantity) {
      alert(`Only ${item.quantity - alreadyAdded} more available`);
      return;
    }

    if (item.quantity === 0) {
      alert("Out of Stock");
      return;
    }

    if (existing) {
      setInvoiceItems(
        invoiceItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      );
    } else {
      setInvoiceItems([...invoiceItems, { ...item, quantity: qty }]);
    }
  };
  const removeItem = (itemId) => {
  setInvoiceItems(prev => prev.filter(item => item.id !== itemId));

  // quantity reset
  setQuantities(prev => {
    const updated = { ...prev };
    delete updated[itemId];
    return updated;
  });
};
  

  const subtotal = invoiceItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  /* PAYMENT */
  const handlePayment = async () => {

    for (const item of invoiceItems) {

      const stock = stockItems.find(s => s.id === item.id);

      if (!stock || stock.quantity < item.quantity) {
        alert(`Not enough stock for ${item.name}`);
        return;
      }

      for (let i = 0; i < item.quantity; i++) {
        await axios.patch(`http://localhost:5000/api/stocks/decrease/${item.id}`);
      }
    }

    setPaid(true);
    setPaymentStatus("Paid");
    await fetchStocks();

    // ✅ RESET AFTER PAYMENT
    setTimeout(() => {
      setInvoiceItems([]);
      setQuantities({});
      setPaid(false);
      setPaymentStatus("Pending");
      setShowQR(false);
    }, 6000);
  };

  /* PDF (NO ₹ SYMBOL) */
  const downloadAndPrint = () => {

  if (!paid) {
    alert("Complete payment first");
    return;
  }

  const doc = new jsPDF();

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("Invoice", 20, 25);

  // Company name
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("VyaparMate", 20, 35);

  // Date
  doc.text(`Date: ${new Date().toLocaleString()}`, 150, 35);

  // Table Header Background
  doc.setFillColor(255, 204, 153); // light orange
  doc.rect(20, 45, 170, 10, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.text("Description", 22, 52);
  doc.text("Price", 100, 52);
  doc.text("Qty", 130, 52);
  doc.text("Total", 160, 52);

  let y = 65;

  doc.setFont("helvetica", "normal");

  invoiceItems.forEach((item) => {
    doc.text(item.name, 22, y);
    doc.text("Rs. " + item.price, 100, y);
    doc.text(item.quantity.toString(), 130, y);
    doc.text("Rs. " + (item.price * item.quantity), 160, y);

    // Line under row
    doc.line(20, y + 3, 190, y + 3);

    y += 12;
  });

  // Subtotal
  y += 10;
  doc.text("Subtotal:", 130, y);
 doc.text("Rs. " + subtotal.toFixed(2), 160, y);


  // Tax
  y += 10;
  doc.text("Tax (5%):", 130, y);
  doc.text("Rs. " + gst.toFixed(2), 160, y);


  // Total
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Total:", 130, y);
  doc.text("Rs. " + total.toFixed(2), 160, y);

  // Thank You box
  y += 25;
  doc.setFillColor(255, 102, 102); // soft red
  doc.roundedRect(70, y, 60, 15, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.text("Thank You!", 85, y + 10);

  // Footer reset color
  doc.setTextColor(0, 0, 0);

  doc.save("invoice.pdf");
};

  return (
    <><section className="pt-28 sm:pt-32 px-3 sm:px-4 pb-16 bg-main min-h-screen">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* INVOICE */}
        <div className="glass card-hover rounded-2xl shadow-xl p-4 sm:p-6 border border-white/40">

          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
            INVOICE
          </h1>

          <div className="flex justify-between text-sm mb-4">
            <p><b>Invoice No:</b> #1234</p>
            <p><b>Date:</b> {new Date().toLocaleString()}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
                <tr>
                  <th className="p-2">Item</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>

              <tbody>
                {invoiceItems.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">₹{item.price}</td>
                    <td className="p-2">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-6 font-semibold">
            <span>Grand Total</span>
            <span className="text-green-700">₹{total.toFixed(2)}</span>
          </div>

          <div className="mt-3 text-sm">
            Payment Status:
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
              {paymentStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">

            <button
              onClick={() => {
                if (invoiceItems.length === 0) {
                  alert("Please select at least one item");
                  return;
                }
                setShowQR(true);
              } }
              disabled={invoiceItems.length === 0}
              className={`py-2 rounded-xl text-white btn-animate shadow-md ${invoiceItems.length === 0
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105"}`}
            >
              Generate QR
            </button>

            <button className="border py-2 rounded-lg">
              Payment History
            </button>

            <button
              onClick={() => {
                if (invoiceItems.length === 0) {
                  alert("Please select at least one item");
                  return;
                }
                // your existing WhatsApp logic here
              } }
              disabled={invoiceItems.length === 0}
              className={`py-2 rounded-xl text-white btn-animate shadow-md ${invoiceItems.length === 0
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-105"}`}
            >
              WhatsApp
            </button>

          </div>

        </div>

        {/* SELECT ITEMS */}
        <div className="glass card-hover rounded-2xl shadow-xl p-4 sm:p-6 border border-white/40">
          <h2 className="text-xl font-semibold mb-4">Select Items</h2>

          <input
            type="text"
            placeholder="Search..."
            className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => setSearch(e.target.value)} />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* ✅ NEW COLUMN STRUCTURE */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Available</th>
                  <th className="p-2 text-left">Qty</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map(item => {
                  const isAdded = invoiceItems.some(i => i.id === item.id);
                  return (

                    <tr key={item.id} className="border-t">

                      <td className="p-2">{item.name}</td>
                      <td className="p-2">₹{item.price}</td>
                      <td className="p-2">{Math.max(0, item.quantity)}</td>

                      <td className="p-2">
                        <input
                          type="number"
                          min="1"
                          max={item.quantity}
                          value={quantities[item.id] || ""}
                          className="w-16 border rounded px-2"
                          onChange={(e) => setQuantities({
                            ...quantities,
                            [item.id]: Math.max(1, parseInt(e.target.value) || 1)
                          })} />
                      </td>

                      <td className="p-2 flex gap-2 items-center">
                        {/* ADD BUTTON */}
                        {item.quantity > 0 && (
                          <button
                            onClick={() => addItem(item)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-lg hover:scale-105 active:scale-95"
                          >
                            Add
                          </button>
                        )}

                        {/* 🗑️ DELETE BUTTON (ONLY WHEN ADDED & NOT PAID) */}
                        {isAdded && !paid && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>

                    </tr>

                  );
                })}
              </tbody>

            </table>
          </div>

        </div>

      </div>

      {/* QR */}
      {showQR && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="glass p-6 rounded-2xl text-center w-80 shadow-2xl border border-white/40 animate-[fadeIn_0.3s_ease]">

            <h3 className="text-lg font-semibold mb-3">Scan to Pay</h3>

            <div className="flex justify-center">
              <QRCode value={`PAYMENT:${total}`} size={220} />
            </div>

            <p className="my-4">₹{total.toFixed(2)}</p>

            {!paid ? (
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-xl shadow-lg hover:scale-105 active:scale-95"
              >
                Pay
              </button>
            ) : (
              <>
                <p className="text-green-600 font-semibold mb-3">
                  Payment Successful ✓
                </p>

                <button
                  onClick={downloadAndPrint}
                  className="w-full bg-green-500 text-white py-2 rounded-lg mb-2"
                >
                  Download & Print
                </button>

                <button
                  onClick={() => {
                    setShowQR(false);
                    // 🔥 Reset everything
                    setInvoiceItems([]);
                    setQuantities({});
                    setPaid(false);
                    setPaymentStatus("Pending");
                  } }
                  className="w-full bg-gray-100 py-2 rounded-xl hover:bg-gray-200 hover:scale-105"
                >
                  Close
                </button>
              </>
            )}

          </div>

        </div>
      )}
    </section><Footer /></>

  );
}