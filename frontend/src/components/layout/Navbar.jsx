export default function Navbar() {
  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Features", id: "features" },
    { label: "Categories", id: "categories" },
    { label: "Billing", id: "billing" },
    { label: "Stocks", id: "stocks" },
    { label: "AI Assistant", id: "ai" },
    { label: "Contact", id: "contact" },
    { label: "About Us", id: "about" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
        
        {/* Logo - Left Side */}
        <div
          onClick={() => scrollToSection("hero")}
          className="flex items-center font-semibold text-lg cursor-pointer"
        >
          <img
            src="Vyapar_cart.png"
            alt="VyaparMate Logo"
            className="h-14 w-auto -mr-1"
          />
          <span className="-ml-2 leading-none">VyaparMate</span>
        </div>

        {/* Desktop Nav - Center Aligned */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-600 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-green-500 transition whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Login Button - Right Side */}
        <div className="flex items-center">
          <button
            onClick={() => {
              // Add your login logic here
              console.log("Login clicked");
            }}
            className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
            aria-label="Login"
            title="Login"
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
        </div>

      </div>
    </header>
  );
}