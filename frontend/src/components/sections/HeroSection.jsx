export default function HeroSection() {
  return (
    <section
      id="hero"
      className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">

        {/* LEFT */}
        <div className="text-center md:text-left animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            VyaparMate — Chhote business ka bada saathi
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base max-w-md mx-auto md:mx-0">
            A calculator-style payment & business assistant designed for small Indian businesses.
            Your Smart Business Companion for MSMEs.
          </p>

          <p className="mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm max-w-md mx-auto md:mx-0">
            Generate UPI QR instantly, track daily cash flow, and get friendly AI insights —
            all with zero complexity.
          </p>

          {/* Premium CTA Button */}
          <button className="btn-cta pulse mt-6 sm:mt-8 w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-sm sm:text-base">
            Get Started
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center animate-fade-in-delay">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-52 sm:h-64 md:h-72 lg:h-96 rounded-xl overflow-hidden shadow-lg">
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
