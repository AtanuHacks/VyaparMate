
export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            VyaparMate — Simple, Trusted, Smart Fintech for Every Shopkeeper
          </h1>

          <p className="mt-6 text-gray-600 max-w-md">
            A calculator-style payment & business assistant designed for small Indian businesses.
          </p>

          <p className="mt-4 text-gray-500 text-sm max-w-md">
            Generate UPI QR instantly, track daily cash flow, and get friendly AI insights — all with zero complexity.
          </p>

          <button className="mt-8 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition">
            Get Started
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            <img 
                    src="https://images.unsplash.com/photo-1726056652684-9c135013cef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBmaW50ZWNofGVufDF8fHx8MTc2ODcxOTY4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="VyaparMate App Interface"
                    className="w-full h-full object-cover"
                  />
          </div>
        </div>


      </div>
    </section>
  );
}
