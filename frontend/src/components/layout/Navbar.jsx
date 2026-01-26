export default function Navbar() {
  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Features", id: "features" },
    { label: "Categories", id: "categories" },
    { label: "Billing", id: "billing" },
    { label: "Screens", id: "screens" },
    { label: "AI Assistant", id: "ai" },
    { label: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 font-semibold text-lg cursor-pointer"
        >
          <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center text-white">
            🏪
          </div>
          VyaparMate
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

        {/* CTA */}
        <button
          onClick={() => scrollToSection("billing")}
          className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition"
        >
          Get Started
        </button>

      </div>
    </header>
  );
}
