import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
export default function About() {
  const navigate = useNavigate();
  return (
    <>
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-20">

      {/* Badge */}
      <div className="text-center mb-6">
        <span className="inline-block bg-green-100 text-green-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
          Empowering 6+ Crore MSMEs 🇮🇳
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          About VyaparMate
        </h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Looks like a calculator. Works like UPI. Thinks like a business partner.
        </p>
      </div>

      {/* Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Chhote business ka bada saathi
          </h2>

          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            In India, most small shopkeepers accept UPI payments — but still manage
            stock, expenses, and customer credit using notebooks and guesswork.
          </p>

          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            VyaparMate keeps the front-end extremely simple while running
            intelligent analytics in the background. No dashboards. No confusion.
            Just one clear suggestion at a time.
          </p>

          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            We don’t teach shopkeepers how to use software.
            We make software behave like a shopkeeper.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
          <h3 className="text-xl font-semibold text-gray-900">
            What Makes Us Different
          </h3>

          <ul className="mt-6 space-y-4 text-gray-600 text-sm sm:text-base">
            <li>✔ Calculator-style UPI flow</li>
            <li>✔ AI-powered business assistant</li>
            <li>✔ Smart demand prediction</li>
            <li>✔ Credit risk scoring for udhaar</li>
            <li>✔ Local-language friendly design</li>
          </ul>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="bg-green-50 rounded-xl p-8">
          <h3 className="text-3xl font-bold text-green-600">6+ Crore</h3>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            MSMEs in India
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-8">
          <h3 className="text-3xl font-bold text-green-600">90%+</h3>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Accept UPI Payments
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-8">
          <h3 className="text-3xl font-bold text-green-600">Zero</h3>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Learning Curve
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            How VyaparMate Works
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Simple user experience. Powerful backend intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              1. Collect Payments
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Enter amount → Generate QR → Receive UPI payment.
              Fast, familiar, and effortless.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              2. Analyze Automatically
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Sales, stock, expenses, and customer behavior
              are analyzed in the background.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              3. Get Smart Suggestions
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              One clear insight at a time —
              reorder alerts, demand prediction, and credit risk warnings.
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="mt-24 bg-green-50 border border-green-100 rounded-xl p-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Our Vision
        </h2>

        <p className="mt-4 text-gray-700 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          To make intelligent business tools accessible to every small shop
          in India — from kirana stores to small wholesalers —
          helping them increase profits, reduce losses,
          and make confident decisions every single day.
        </p>

        <button className="mt-8 btn-cta px-6 py-3 rounded-lg font-medium text-sm sm:text-base" onClick={() => navigate("/")}>
          Join the Movement
        </button>
      </div>

    </section>
    <Footer />
    </>
  );
}