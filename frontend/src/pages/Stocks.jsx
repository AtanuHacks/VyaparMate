import Footer from "../components/layout/Footer";
export default function Stocks() {
  return (
    <>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
            Stock Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Add, view and manage your shop inventory
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <button className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium">
            + Add Item
          </button>

          <input
            type="text"
            placeholder="Search items..."
            className="w-full sm:w-64 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          />
        </div>

        {/* Table / Cards */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Item</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Rice (25kg)", qty: 12, price: "₹1,200", status: "In Stock" },
                  { name: "Sugar", qty: 3, price: "₹45/kg", status: "Low" },
                  { name: "Oil (1L)", qty: 0, price: "₹160", status: "Out" },
                ].map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.qty}</td>
                    <td className="px-4 py-3">{item.price}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          item.status === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Low"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
    <Footer />
    </>
  );
}
