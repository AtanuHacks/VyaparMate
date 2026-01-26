/* =========================
   components/layout/Footer.jsx
========================= */
export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
        <div>
          <h3 className="font-semibold mb-2">VyaparMate</h3>
          <p>Empowering small Indian businesses with simple, smart fintech solutions.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1"><li>Home</li><li>Features</li><li>Screens</li></ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1"><li>AI Assistant</li><li>Download</li><li>Contact</li></ul>
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-10">© 2026 VyaparMate. Built for small businesses across India.</p>
    </footer>
  );
}