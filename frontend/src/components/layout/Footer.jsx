import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid gap-12 mb-8 md:grid-cols-2 text-center md:text-left">

          {/* Brand */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold text-gray-900">
              VyaparMate
            </h2>
            <p className="text-gray-600 font-light text-sm max-w-md">
              Empowering small Indian businesses with simple, smart fintech solutions.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 place-items-center md:place-items-start">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#hero" className="text-gray-600 hover:text-green-500 transition">Home</a></li>
                <li><a href="#stocks" className="text-gray-600 hover:text-green-500 transition">Stocks</a></li>
                <li><a href="#categories" className="text-gray-600 hover:text-green-500 transition">Categories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#ai" className="text-gray-600 hover:text-green-500 transition">AI Assistant</a></li>
                <li><a href="#about" className="text-gray-600 hover:text-green-500 transition">About Us</a></li>
                <li><a href="#contact" className="text-gray-600 hover:text-green-500 transition">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col items-center gap-6 md:flex-row md:justify-between">

          <p className="text-gray-500 text-sm font-light text-center md:text-left">
            © 2026 VyaparMate · Cloud Wizards. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[Twitter, Linkedin, Github, Mail].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-green-500 flex items-center justify-center transition group"
              >
                <Icon className="w-4 h-4 text-gray-600 group-hover:text-green-500" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
