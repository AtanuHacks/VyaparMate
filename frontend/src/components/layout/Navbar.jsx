import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Features", id: "features" },
    { label: "Categories", id: "categories" },
    { label: "Billing", id: "billing" },
    { label: "Stocks", id: "stocks" },
    { label: "AI Assistant", id: "ai" },

    // Route pages
    { label: "Contact", path: "/contact" },
    { label: "About Us", path: "/about" },
  ];

  const handleNavigation = (item) => {
    setIsOpen(false);

    // If route exists → navigate
    if (item.path) {
      navigate(item.path);
      return;
    }

    // If section scroll
    // If not on home, go home first
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
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center font-semibold text-lg cursor-pointer"
        >
          <img
            src="Vyapar_cart.png"
            alt="VyaparMate Logo"
            className="h-14 w-auto -mr-1"
          />
          <span className="-ml-2 leading-none">VyaparMate</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-600 absolute left-1/2 transform -translate-x-1/2">
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
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition shadow-md"
            aria-label="Login"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col px-4 py-4 gap-3 text-gray-700">
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
    </header>
  );
}
