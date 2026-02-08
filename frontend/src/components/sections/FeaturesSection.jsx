import { Calculator, QrCode, Sparkles } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Calculator First",
    description:
      "Instantly calculate amounts and generate payment requests with a familiar calculator interface.",
  },
  {
    icon: QrCode,
    title: "UPI QR In Seconds",
    description:
      "Create personalized UPI QR codes for any amount in just one tap — no technical knowledge needed.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant for MSMEs",
    description:
      "Get smart business insights, cash flow summaries, and friendly advice tailored for small businesses.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">

          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center space-y-4">

                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
