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
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => scrollToSection("hero")}
          className="flex items-center font-semibold text-lg cursor-pointer"
        >
          <img
            src="Vyapar_cart.png"
            alt="VyaparMate Logo"
            className="h-14 w-auto -mr-1"   // 👈 cart size controlled here
          />
          <span className="-ml-2 leading-none">VyaparMate</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-green-500 transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

      </div>
    </header>
  );
}
