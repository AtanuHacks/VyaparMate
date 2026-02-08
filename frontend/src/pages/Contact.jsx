import Footer from "../components/layout/Footer";

export default function Contact() {
  return (
    <div className="pt-20 min-h-screen flex flex-col">
      <div className="flex-grow px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-gray-600">
          Email: support@vyaparmate.com
        </p>
      </div>

      <Footer />
    </div>
  );
}
