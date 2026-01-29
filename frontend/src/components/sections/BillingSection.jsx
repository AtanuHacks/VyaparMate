import { FileText, Download, Send, CheckCircle, Store } from "lucide-react";

const billingFeatures = [
  {
    icon: FileText,
    title: "Smart Bill Generation",
    description:
      "Create professional invoices instantly with item details, GST calculations, and customer info.",
  },
  {
    icon: Download,
    title: "Download & Print",
    description:
      "Export bills as PDF or print directly from the app for your customers.",
  },
  {
    icon: Send,
    title: "Send via WhatsApp",
    description:
      "Share bills directly with customers through WhatsApp with one tap.",
  },
  {
    icon: CheckCircle,
    title: "Payment Tracking",
    description:
      "Mark bills as paid or pending and track all transactions effortlessly.",
  },
];

export default function BillingSection() {
  return (
    <section
      id="billing"
      className="py-20 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Sample Bill Preview */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Invoice
                    </h3>
                    <p className="text-sm text-gray-500 font-light">
                      Bill #1234
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="text-sm space-y-1">
                  <p className="font-semibold text-gray-900">
                    Sharma Kirana Store
                  </p>
                  <p className="text-gray-600 font-light">
                    123 Main Street, Mumbai
                  </p>
                  <p className="text-gray-600 font-light">
                    GSTIN: 27XXXXX1234X1ZX
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-light">
                    Rice (10kg)
                  </span>
                  <span className="text-gray-900">₹450.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-light">
                    Dal (2kg)
                  </span>
                  <span className="text-gray-900">₹240.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-light">
                    Oil (1L)
                  </span>
                  <span className="text-gray-900">₹180.00</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-light">
                    Subtotal
                  </span>
                  <span className="text-gray-900">₹870.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-light">
                    GST (5%)
                  </span>
                  <span className="text-gray-900">₹43.50</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-green-600">₹913.50</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition-all font-medium text-sm">
                  Generate QR
                </button>
                <button className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-700 py-3 rounded-xl transition-all font-medium text-sm">
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                Professional Billing Made Simple
              </h2>
              <p className="text-gray-600 font-light text-lg">
                Generate GST-compliant bills in seconds with our easy-to-use
                interface designed for Indian businesses.
              </p>
            </div>

            <div className="space-y-6">
              {billingFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 font-light text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
