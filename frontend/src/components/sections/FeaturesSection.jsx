/* =========================
   components/sections/FeaturesSection.jsx
========================= */
export default function FeaturesSection() {
  const features = [
    { title: "Calculator First", desc: "Instantly calculate amounts and generate payment requests." },
    { title: "UPI QR In Seconds", desc: "Create personalized UPI QR codes in one tap." },
    { title: "AI Assistant for MSMEs", desc: "Smart business insights and cash flow summaries." },
  ];

  return (
    <section id="features" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">✔</div>
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}