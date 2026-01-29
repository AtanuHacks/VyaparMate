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
      className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 mb-2">
                  <Icon className="w-8 h-8 text-green-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-600 font-light leading-relaxed">
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
