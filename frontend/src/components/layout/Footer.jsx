import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-8">

          {/* Left - Brand Text */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              VyaparMate
            </h2>
            <p className="text-gray-600 font-light text-sm max-w-md">
              Empowering small Indian businesses with simple, smart fintech solutions.
            </p>
          </div>

          {/* Right - Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#hero" className="text-gray-600 hover:text-gray-900 text-sm font-light transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-light transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#categories" className="text-gray-600 hover:text-gray-900 text-sm font-light transition">
                    Categories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#ai" className="text-gray-600 hover:text-gray-900 text-sm font-light transition">
                    AI Assistant
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm font-light transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-600 hover:text-gray-900 text-sm font-light transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-light">
            © 2026 VyaparMate. Built for small businesses across India. © Cloud Wizards. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-green-500 flex items-center justify-center transition group">
              <Twitter className="w-4 h-4 text-gray-600 group-hover:text-green-500" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-green-500 flex items-center justify-center transition group">
              <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-green-500" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-green-500 flex items-center justify-center transition group">
              <Github className="w-4 h-4 text-gray-600 group-hover:text-green-500" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-green-500 flex items-center justify-center transition group">
              <Mail className="w-4 h-4 text-gray-600 group-hover:text-green-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
