/* =========================
   components/sections/CategoriesSection.jsx
========================= */
export default function CategoriesSection() {
  const categories = [
    "Kirana Stores",
    "Restaurants & Cafes",
    "Medical Stores",
    "Textile & Garments",
    "Hardware & Services",
  ];

  return (
    <section id="categories" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-4">Built for Every Business</h2>
      <p className="text-center text-gray-600 mb-12">
        VyaparMate adapts to your business type, whether you run a small kirana store or a growing retail shop.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat} className="border rounded-2xl p-6 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl" />
            <div>
              <h4 className="font-medium">{cat}</h4>
              <p className="text-sm text-gray-500">Optimized billing & tracking</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}