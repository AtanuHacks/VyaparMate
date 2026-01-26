/* =========================
   components/sections/BillingSection.jsx
========================= */
export default function BillingSection() {
  return (
    <section id="billing" className="bg-gray-50 py-20 pt-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <img src="/invoice-preview.png" alt="Invoice" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Professional Billing Made Simple</h2>
          <p className="text-gray-600 mb-6">
            Generate GST-compliant bills in seconds with our easy-to-use interface designed for Indian businesses.
          </p>
          <ul className="space-y-4 text-sm text-gray-600">
            <li>📄 Smart Bill Generation</li>
            <li>⬇ Download & Print</li>
            <li>📲 Send via WhatsApp</li>
            <li>✅ Payment Tracking</li>
          </ul>
        </div>
      </div>
    </section>
  );
}