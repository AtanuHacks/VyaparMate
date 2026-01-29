import { Store, ShoppingBag, Utensils, Pill, Shirt, Wrench } from "lucide-react";

const categories = [
  {
    icon: Store,
    title: "Kirana Stores",
    description: "Perfect for neighborhood grocery shops",
  },
  {
    icon: ShoppingBag,
    title: "Retail Shops",
    description: "Manage sales for retail businesses",
  },
  {
    icon: Utensils,
    title: "Restaurants & Cafes",
    description: "Quick billing for food businesses",
  },
  {
    icon: Pill,
    title: "Medical Stores",
    description: "Track inventory and payments",
  },
  {
    icon: Shirt,
    title: "Textile & Garments",
    description: "Handle bulk orders with ease",
  },
  {
    icon: Wrench,
    title: "Hardware & Services",
    description: "Invoice for services and products",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Built for Every Business
          </h2>
          <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto">
            VyaparMate adapts to your business type, whether you run a small
            kirana store or a growing retail shop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-500 group-hover:to-emerald-600 flex items-center justify-center mb-4 transition-all">
                  <Icon className="w-6 h-6 text-green-600 group-hover:text-white transition-all" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 font-light text-sm">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
