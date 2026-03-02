import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid gap-10 sm:gap-12 mb-8 grid-cols-1 md:grid-cols-2 text-center md:text-left">

          {/* Brand */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              VyaparMate
            </h2>
            <p className="text-gray-600 font-light text-sm max-w-sm sm:max-w-md">
              Empowering small Indian businesses with simple, smart fintech solutions.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 place-items-center md:place-items-start">

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => handleScroll("hero")}
                    className="text-gray-600 hover:text-green-500 transition"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/stocks")}
                    className="text-gray-600 hover:text-green-500 transition"
                  >
                    Stocks
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScroll("categories")}
                    className="text-gray-600 hover:text-green-500 transition"
                  >
                    Categories
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                Resources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/assistant")}
                    className="text-gray-600 hover:text-green-500 transition"
                  >
                    AI Assistant
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="text-gray-600 hover:text-green-500 transition"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-gray-600 hover:text-green-500 transition"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">

          <p className="text-gray-500 text-xs sm:text-sm font-light text-center md:text-left">
            © 2026 VyaparMate · Cloud Wizards. All rights reserved.
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            {[Twitter, Linkedin, Github, Mail].map((Icon, idx) => (
              <div
                key={idx}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-200 hover:border-green-500 flex items-center justify-center transition group cursor-pointer"
              >
                <Icon className="w-4 h-4 text-gray-600 group-hover:text-green-500" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}