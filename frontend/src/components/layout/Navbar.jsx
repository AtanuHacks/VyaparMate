import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoginModal from "../LoginModal";
import ProfileModal from "../ProfileModal";

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
    { label: "Stocks", path: "/stocks", protected: true },
    { label: "AI Assistant", path: "/assistant", protected: true },
    { label: "Contact", path: "/contact" },
    { label: "About Us", path: "/about" },
  ];

  const handleNavigation = (item) => {
    setIsOpen(false);

    // Protected routes
    if (item.protected && !user) {
      setShowLogin(true);
      return;
    }

    // Route navigation
    if (item.path) {
      navigate(item.path);
      return;
    }

    // Scroll navigation
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
    <header className="fixed top-0 w-full bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 lg:h-20 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer flex-shrink-0"
        >
          <img
            src="Vyapar_cart.png"
            alt="VyaparMate Logo"
            className="h-10 sm:h-12 md:h-20 lg:h-20 w-auto"
          />
          <span className="ml-1 text-sm sm:text-base md:text-lg font-semibold">
            VyaparMate
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-5 lg:gap-6 text-sm text-gray-600">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item)}
              className="hover:text-green-500 transition whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">

          {/* Profile / Login Button */}
          {user ? (
            <button
              onClick={() => setShowProfile(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold shadow-md"
              aria-label="Profile"
            >
              {user.name?.charAt(0)?.toUpperCase()}
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition shadow-md"
              aria-label="Login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col px-4 py-4 gap-3 text-gray-700 text-sm">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item)}
                className="text-left py-2 hover:text-green-500 transition"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />

      {/* Profile Modal */}
      {user && (
        <ProfileModal
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          user={user}
          onLogout={() => {
            logout();
            setShowProfile(false);
          }}
        />
      )}
    </header>
  );
}
