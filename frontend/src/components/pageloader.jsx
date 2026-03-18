import { motion, AnimatePresence } from "framer-motion";
import { Store, TrendingUp, Zap, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function PageLoader({ onLoadComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  useEffect(() => {
    const messages = [
      { progress: 20, text: "Loading features" },
      { progress: 50, text: "Preparing dashboard" },
      { progress: 80, text: "Almost ready" },
      { progress: 100, text: "Welcome!" },
    ];

    let messageIndex = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;

        if (
          messageIndex < messages.length &&
          newProgress >= messages[messageIndex].progress
        ) {
          setLoadingText(messages[messageIndex].text);
          messageIndex++;
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadComplete(), 600);
          return 100;
        }

        return newProgress;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  // ✅ Responsive orbit radius
  const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 45 : 70;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-emerald-950 via-gray-900 to-slate-950 flex flex-col items-center justify-center z-[100] overflow-hidden px-4"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-green-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-10 md:mb-12"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl blur-2xl opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="relative w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-3xl flex items-center justify-center shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(16,185,129,0.5)",
                    "0 0 80px rgba(16,185,129,0.8)",
                    "0 0 40px rgba(16,185,129,0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Store className="w-10 h-10 md:w-14 md:h-14 text-white" />

                {[
                  { Icon: TrendingUp, angle: 0 },
                  { Icon: Zap, angle: 120 },
                  { Icon: Sparkles, angle: 240 },
                ].map(({ Icon, angle }, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        position: "absolute",
                        left: `${Math.cos((angle * Math.PI) / 180) * radius}px`,
                        top: `${Math.sin((angle * Math.PI) / 180) * radius}px`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: -360,
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                      }}
                    >
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Brand */}
          <div className="text-center mb-2">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              VyaparMate
            </h1>
            <p className="text-green-400/80 text-xs md:text-sm font-medium tracking-wider uppercase">
              Business Assistant
            </p>
          </div>

          {/* Loading Text */}
          <div className="text-center mb-8 md:mb-10 h-6">
            <motion.p
              key={loadingText}
              className="text-gray-400 font-light text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {loadingText}
            </motion.p>
          </div>

          {/* Progress bar */}
          <div className="w-64 md:w-80">
            <div className="h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-400"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="text-center mt-3 text-green-400 font-medium text-sm">
              {progress}%
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}