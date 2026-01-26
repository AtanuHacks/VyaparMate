/* =========================
   components/sections/HeroSection.jsx
========================= */
export default function HeroSection() {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          VyaparMate — Simple, Trusted, Smart Fintech for Every Shopkeeper
        </h1>
        <p className="text-gray-600 mb-4">
          A calculator-style payment & business assistant designed for small Indian businesses.
        </p>
        <p className="text-gray-600 mb-8">
          Generate UPI QR instantly, track daily cash flow, and get friendly AI insights — all with zero complexity.
        </p>
        <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium">
          Get Started
        </button>
      </div>
      <div className="rounded-3xl overflow-hidden shadow-lg">
        <img src="/hero-image.png" alt="App preview" />
      </div>
    </section>
  );
}

