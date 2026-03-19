import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoginModal from "../LoginModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Features", id: "features" },
    { label: "Categories", id: "categories" },
    { label: "Billing", id: "billing" },
    { label: "Dashboard", path: "/dashboard", protected: true },
    { label: "Analytics", path: "/analytics", protected: true },
    { label: "Stocks", path: "/stocks", protected: true },
    { label: "AI Assistant", path: "/assistant", protected: true },
    { label: "Contact", path: "/contact" },
    { label: "About Us", path: "/about" },
  ];

  const handleNavigation = (item) => {
    setIsOpen(false);

    if (item.protected && !user) {
      setShowLogin(true);
      return;
    }

    if (item.path) {
      navigate(item.path);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(item.id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <motion.header
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          whileHover={{
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 bg-white/70 backdrop-blur-xl rounded-xl md:rounded-full border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        >
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <img
              src="/Vyapar_cart.png"
              alt="VyaparMate"
              className="h-11 sm:h-12 md:h-14 w-auto object-contain"
            />
            <span className="font-semibold text-gray-800 text-base sm:text-lg">
              VyaparMate
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavigation(item)}
                className="relative group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="group-hover:text-green-600 transition">
                  {item.label}
                </span>

                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white border shadow hover:bg-gray-100 transition">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            {user ? (
              <button
                onClick={() => setShowProfile(true)}
                className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold"
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center"
              >
                👤
              </button>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        {isOpen && (
        <div className="absolute top-full mt-2 w-full left-0 md:hidden">
          <div className="bg-white rounded-xl shadow-lg border mx-2">
            <nav className="flex flex-col px-4 py-3 gap-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item)}
                  className="text-left py-2 hover:text-green-600"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
      </motion.header>

      {/* Logout Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-[340px] p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">{user.name}</h2>

            <p className="text-gray-500 mb-6">{user.mobile}</p>

            <button
              onClick={() => {
                logout();
                setShowProfile(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
            >
              Logout
            </button>

            <button
              onClick={() => setShowProfile(false)}
              className="mt-3 text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}