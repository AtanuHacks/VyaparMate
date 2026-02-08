import Footer from "../components/layout/Footer";

export default function About() {
  return (
    <div className="pt-20 min-h-screen flex flex-col">
      <div className="flex-grow px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">About VyaparMate</h1>
        <p className="text-gray-600">
          VyaparMate is an AI-powered business assistant for MSMEs.
        </p>
      </div>

      <Footer />
    </div>
  );
}
