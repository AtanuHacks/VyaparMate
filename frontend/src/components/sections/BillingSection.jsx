import { FileText, Download, Send, CheckCircle, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <section
      id="billing"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-main"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left - Sample Bill Preview */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 lg:p-8 border border-gray-100">

              <div className="border-b border-gray-200 pb-5 mb-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Invoice
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-light">
                      Bill #1234
                    </p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>

                <div className="text-xs sm:text-sm space-y-1">
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

              <div className="space-y-2 sm:space-y-3 mb-5">
                {[
                  ["Rice (10kg)", "₹450.00"],
                  ["Dal (2kg)", "₹240.00"],
                  ["Oil (1L)", "₹180.00"],
                ].map(([item, price], i) => (
                  <div key={i} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 font-light">{item}</span>
                    <span className="text-gray-900">{price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600 font-light">Subtotal</span>
                  <span className="text-gray-900">₹870.00</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600 font-light">GST (5%)</span>
                  <span className="text-gray-900">₹43.50</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-semibold pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-green-600">₹913.50</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                   <button
                    onClick={() => navigate("/billing")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 sm:py-3 rounded-xl transition font-medium text-sm"
                  >
                    Generate QR
                   </button>

                <button className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-xl transition font-medium text-sm">
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Professional Billing Made Simple
              </h2>
              <p className="text-gray-600 font-light text-sm sm:text-base lg:text-lg">
                Generate GST-compliant bills in seconds with our easy-to-use
                interface designed for Indian businesses.
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {billingFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 font-light text-xs sm:text-sm">
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
