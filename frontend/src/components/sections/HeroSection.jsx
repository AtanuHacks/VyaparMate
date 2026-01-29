
export default function HeroSection() {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            VyaparMate — Chhote business ka bada saathi
          </h1>

          <p className="mt-6 text-gray-600 max-w-md">
            A calculator-style payment & business assistant designed for small Indian businesses. Your Smart Business Companion for MSMEs.
          </p>

          <p className="mt-4 text-gray-500 text-sm max-w-md">
            Generate UPI QR instantly, track daily cash flow, and get friendly AI insights — all with zero complexity. Simple, Trusted, Smart Fintech for Every Shopkeeper.
          </p>

          <button className="mt-8 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition">
            Get Started
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            <img 
                    src="hero_img.png" 
                    alt="VyaparMate App Interface"
                    className="w-full h-full object-cover"
                  />
          </div>
        </div>


      </div>
    </section>
  );
}
