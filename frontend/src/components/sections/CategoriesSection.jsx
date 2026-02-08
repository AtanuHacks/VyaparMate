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
    <section
      id="categories"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Built for Every Business
          </h2>
          <p className="text-gray-600 font-light text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            VyaparMate adapts to your business type, whether you run a small
            kirana store or a growing retail shop.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="
                             group
                                    p-5 sm:p-6
                                    rounded-2xl
                                    border-gray-200
                                    bg-white
                                    transition-all duration-300 ease-out
                                    hover:-translate-y-2
                                    hover:shadow-xl
                                    hover:border-green-300
                                    cursor-pointer
                                    "

              >
                <div className="group
p-5 sm:p-6
rounded-2xl
border border-gray-200
bg-white
transition-all duration-300 ease-out
hover:-translate-y-2
hover:shadow-xl
hover:border-green-300
cursor-pointer
">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12
rounded-xl
bg-gradient-to-br from-green-100 to-emerald-100
group-hover:from-green-500 group-hover:to-emerald-600
flex items-center justify-center
mb-3 sm:mb-4
transition-all duration-300
group-hover:scale-110
" />
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 font-light text-xs sm:text-sm">
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
