import { motion } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Sparkles,
  DollarSign,
  PieChart,
  BarChart3,
} from "lucide-react";

const floatingIcons = [
  {
    Icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
    position: { top: "15%", left: "10%" },
    delay: 0,
  },
  {
    Icon: Zap,
    color: "from-orange-500 to-orange-600",
    position: { top: "25%", right: "15%" },
    delay: 0.5,
  },
  {
    Icon: Sparkles,
    color: "from-green-400 to-emerald-500",
    position: { top: "60%", left: "8%" },
    delay: 1,
  },
  {
    Icon: DollarSign,
    color: "from-orange-400 to-orange-500",
    position: { bottom: "20%", right: "10%" },
    delay: 1.5,
  },
  {
    Icon: PieChart,
    color: "from-green-500 to-green-600",
    position: { top: "45%", right: "5%" },
    delay: 0.8,
  },
  {
    Icon: BarChart3,
    color: "from-emerald-500 to-green-600",
    position: { bottom: "35%", left: "12%" },
    delay: 1.2,
  },
];

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingIcons.map(({ Icon, color, position, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg opacity-[0.07]`}
          style={position}
          initial={{ y: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 5, -5, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <Icon className="w-8 h-8 text-gray-900" />
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}