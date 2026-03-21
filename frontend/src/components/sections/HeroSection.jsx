import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import LoginModal from "../LoginModal";

export default function HeroSection() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const handleGetStarted = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("categories")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById("categories")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="bg-main scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="text-center md:text-left">

            {/* 🔥 Animated Logo Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center md:items-start"
            >
              <h1 className="flex items-end justify-center md:justify-start font-bold leading-none">

                {/* Big V */}
                <motion.span
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  V
                </motion.span>

                {/* Overlapping text */}
                <span className="-ml-1 sm:-ml-2 md:-ml-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                  yaparMate
                </span>

              </h1>

              {/* Tagline */}
              <p className="mt-2 text-sm sm:text-base text-gray-600 text-center md:text-left">
                Chhote business ka bada saathi
              </p>
            </motion.div>

            {/* Description */}
            <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base max-w-md mx-auto md:mx-0">
              A calculator-style payment & business assistant designed for small Indian businesses.
              Your Smart Business Companion for MSMEs.
            </p>

            <p className="mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm max-w-md mx-auto md:mx-0">
              Generate UPI QR instantly, track daily cash flow, and get friendly AI insights —
              all with zero complexity.
            </p>

            {/* CTA */}
            <button
              onClick={handleGetStarted}
              className="btn-cta pulse mt-6 sm:mt-8 w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center mt-6 md:mt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-52 sm:h-64 md:h-72 lg:h-96 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src="hero_img.png"
                alt="VyaparMate App Interface"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>

        {/* Login Modal */}
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
        />

      </div>
    </section>
  );
}