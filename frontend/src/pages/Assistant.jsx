import Footer from "../components/layout/Footer";
export default function Assistant() {
  return (
    <>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-16 bg-main">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
            AI Assistant
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Smart insights for your daily business
          </p>
        </div>

        {/* Assistant Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">

            {/* Avatar */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold">
              AI
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Hello! I’m your business assistant 👋
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Soon, I’ll help you understand your sales trends, stock shortages,
                profit margins, and even suggest what to reorder.
              </p>

              <div className="mt-4 p-3 sm:p-4 rounded-lg bg-gray-50 border border-dashed border-gray-300 text-sm text-gray-500">
                🚧 AI features coming soon.  
                This is a demo screen for hackathon evaluation.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <Footer />
    </>
  );
}
