import { useState } from "react";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";

export default function Billing() {

  const stockItems = [
    { id: 1, name: "Rice", price: 45 },
    { id: 2, name: "Dal", price: 120 },
    { id: 3, name: "Oil", price: 180 },
    { id: 4, name: "Sugar", price: 55 }
  ];

  const [invoiceItems, setInvoiceItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showQR, setShowQR] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [paid, setPaid] = useState(false);

  const addItem = (item) => {

    const qty = quantities[item.id] || 1;

    const existing = invoiceItems.find(i => i.id === item.id);

    if (existing) {
      setInvoiceItems(
        invoiceItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      );
    } else {
      setInvoiceItems([
        ...invoiceItems,
        { ...item, quantity: qty }
      ]);
    }
  };

  const subtotal = invoiceItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  /* Download + Print */

  const downloadAndPrint = () => {

    const doc = new jsPDF();

    doc.text("VyaparMate Invoice", 20, 20);

    let y = 40;

    invoiceItems.forEach(item => {
      doc.text(
        `${item.name}  Qty:${item.quantity}  ₹${item.price}/kg  Total ₹${item.price * item.quantity}`,
        20,
        y
      );
      y += 10;
    });

    doc.text(`Grand Total ₹${total.toFixed(2)}`, 20, y + 20);

    doc.save("invoice.pdf");

    setTimeout(() => {
      window.print();
    }, 500);
  };

  /* WhatsApp */

  const sendWhatsApp = () => {

    let message = "Invoice:%0A";

    invoiceItems.forEach(item => {
      message += `${item.name} x${item.quantity} = ₹${item.price * item.quantity}%0A`;
    });

    message += `%0AGrand Total: ₹${total.toFixed(2)}`;

    window.open(`https://wa.me/?text=${message}`);
  };

  /* Payment */

  const handlePayment = () => {

    setPaid(true);
    setPaymentStatus("Paid");

    setTimeout(() => {
      setShowQR(false);
    }, 2000);
  };

  return (

    <section className="pt-24 px-4 pb-16 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* INVOICE */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h1 className="text-3xl font-bold text-green-800 mb-4">
            INVOICE
          </h1>

          <div className="flex justify-between text-sm mb-4">

            <p>
              <span className="font-medium">Invoice No:</span> #1234
            </p>

            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date().toLocaleDateString()}
            </p>

          </div>

          <table className="w-full text-sm border">

            <thead className="bg-green-700 text-white">

              <tr>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Qty</th>
                <th className="p-3 text-left">Price / Qty</th>
                <th className="p-3 text-left">Total Price</th>
              </tr>

            </thead>

            <tbody>

              {invoiceItems.map(item => (

                <tr key={item.id} className="border-b">

                  <td className="p-3">{item.name}</td>

                  <td className="p-3">{item.quantity}</td>

                  <td className="p-3">₹{item.price}</td>

                  <td className="p-3 font-medium">
                    ₹{item.price * item.quantity}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="flex justify-between mt-6 text-lg font-semibold">

            <span>Grand Total</span>

            <span className="text-green-700">
              ₹{total.toFixed(2)}
            </span>

          </div>

          <div className="mt-3 text-sm">

            Payment Status:

            <span
              className={`ml-2 px-2 py-1 rounded text-xs ${
                paymentStatus === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {paymentStatus}
            </span>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">

            <button
              onClick={() => setShowQR(true)}
              className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              Generate QR
            </button>

            <button
              onClick={downloadAndPrint}
              className="border py-2 rounded-lg"
            >
              Download & Print
            </button>

            <button
              onClick={sendWhatsApp}
              className="bg-orange-500 text-white py-2 rounded-lg"
            >
              Send via WhatsApp
            </button>

          </div>

        </div>

        {/* ITEMS */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-semibold mb-4">
            Select Items
          </h2>

          <table className="w-full text-sm">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-2 text-left">Item</th>
                <th className="p-2 text-left">Price/kg</th>
                <th className="p-2 text-left">Qty</th>
                <th></th>
              </tr>

            </thead>

            <tbody>

              {stockItems.map(item => (

                <tr key={item.id} className="border-t">

                  <td className="p-2">{item.name}</td>

                  <td className="p-2">₹{item.price}</td>

                  <td className="p-2">

                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="w-16 border rounded px-2 py-1"
                      onChange={(e) =>
                        setQuantities({
                          ...quantities,
                          [item.id]: parseInt(e.target.value)
                        })
                      }
                    />

                  </td>

                  <td className="p-2">

                    <button
                      onClick={() => addItem(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Add
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* QR PAYMENT */}

      {showQR && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl text-center w-80">

            <h3 className="text-lg font-semibold mb-3">
              Scan to Pay
            </h3>

            <div className="flex justify-center mb-4">
              <QRCode value={`PAYMENT:${total}`} size={150} />
            </div>

            <p className="mb-4 font-medium">
              Amount: ₹{total.toFixed(2)}
            </p>

            {!paid ? (

              <button
                onClick={handlePayment}
                className="w-full bg-green-500 text-white py-2 rounded-lg"
              >
                Pay
              </button>

            ) : (

              <p className="text-green-600 font-semibold">
                Payment Successful ✓
              </p>

            )}

          </div>

        </div>

      )}

    </section>
  );
}