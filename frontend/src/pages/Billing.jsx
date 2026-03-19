import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import axios from "axios";

export default function Billing() {

  const [stockItems, setStockItems] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showQR, setShowQR] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [paid, setPaid] = useState(false);

  const [search, setSearch] = useState("");

  /* FETCH STOCKS */
  useEffect(() => {
    const fetchStocks = async () => {
      const res = await axios.get("http://localhost:5000/api/stocks");
      setStockItems(res.data);
    };
    fetchStocks();
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
    const res = await axios.get("http://localhost:5000/api/stocks");
    setStockItems(res.data);
  };

  /* ✅ FIXED PDF */
  const downloadAndPrint = () => {

    if (!paid) {
      alert("Complete payment first");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("INVOICE", 85, 20);

    doc.setFontSize(12);
    doc.text("VyaparMate", 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 30);

    let y = 50;

    doc.text("Item", 20, y);
    doc.text("Qty", 90, y);
    doc.text("Price", 120, y);
    doc.text("Total", 160, y);

    y += 5;
    doc.line(20, y, 190, y);
    y += 10;

    invoiceItems.forEach(item => {
      doc.text(item.name, 20, y);
      doc.text(String(item.quantity), 90, y);
      doc.text(`₹${item.price}`, 120, y);
      doc.text(`₹${item.price * item.quantity}`, 160, y);
      y += 10;
    });

    y += 10;
    doc.line(20, y, 190, y);
    y += 10;

    doc.setFontSize(14);
    doc.text(`Grand Total: ₹${total.toFixed(2)}`, 120, y);

    y += 10;
    doc.setFontSize(12);
    doc.text(`Payment Status: Paid`, 20, y);

    doc.save("invoice.pdf");
  };

  return (
    <section className="pt-20 px-3 sm:px-4 pb-16 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* INVOICE */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">

          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
            INVOICE
          </h1>

          <div className="flex justify-between text-sm mb-4">
            <p><b>Invoice No:</b> #1234</p>
            <p><b>Date:</b> {new Date().toLocaleDateString()}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-green-700 text-white">
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
              onClick={() => setShowQR(true)}
              className="bg-green-500 text-white py-2 rounded-lg"
            >
              Generate QR
            </button>

            <button
              className="border py-2 rounded-lg"
              onClick={() => alert("Payment history coming soon")}
            >
              Payment History
            </button>

            <button
              className="bg-orange-500 text-white py-2 rounded-lg"
            >
              WhatsApp
            </button>

          </div>

        </div>

        {/* SELECT ITEMS */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">

          <h2 className="text-xl font-semibold mb-4">Select Items</h2>

          <input
            type="text"
            placeholder="Search..."
            className="w-full mb-4 p-2 border rounded"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id} className="border-t">

                    <td className="p-2">{item.name}</td>
                    <td className="p-2">₹{item.price}</td>
                    <td className="p-2">{Math.max(0, item.quantity)}</td>

                    <td className="p-2">
                      <input
                        type="number"
                        min="1"
                        className="w-16 border rounded px-2"
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            [item.id]: Math.max(1, parseInt(e.target.value) || 1)
                          })
                        }
                      />
                    </td>

                    <td className="p-2">
                      {item.quantity <= 0 ? (
                        <span className="text-red-500 text-xs">Out</span>
                      ) : (
                        <button
                          onClick={() => addItem(item)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Add
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* QR */}
      {showQR && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl text-center w-80">

            <h3 className="text-lg font-semibold mb-3">Scan to Pay</h3>

            <div className="flex justify-center">
              <QRCode value={`PAYMENT:${total}`} size={150} />
            </div>

            <p className="my-4">₹{total.toFixed(2)}</p>

            {!paid ? (
              <button
                onClick={handlePayment}
                className="w-full bg-green-500 text-white py-2 rounded-lg"
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
                  onClick={() => setShowQR(false)}
                  className="w-full bg-gray-200 py-2 rounded-lg"
                >
                  Close
                </button>
              </>
            )}

          </div>

        </div>
      )}

    </section>
  );
}