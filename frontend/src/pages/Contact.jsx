import Footer from "../components/layout/Footer";

export default function Contact() {
  return (
    <>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-16 bg-main">

      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Contact Us
        </h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          We’d love to hear from you. Whether it’s feedback, partnership, or support — we’re here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Get in Touch
          </h2>

          <div className="mt-6 space-y-4 text-gray-600 text-sm sm:text-base">
            <p>
              📧 Email: support@vyaparmate.in
            </p>

            <p>
              📱 Phone: +91 XXXXX XXXXX
            </p>

            <p>
              📍 Location: India
            </p>
          </div>

          <p className="mt-6 text-gray-500 text-xs sm:text-sm">
            Our team typically responds within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Send a Message
          </h2>

          <form className="mt-6 space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            ></textarea>

            <button
              type="submit"
              className="btn-cta w-full px-6 py-3 rounded-lg font-medium text-sm sm:text-base"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>

    </section>
    <Footer />
    </>
  );
}