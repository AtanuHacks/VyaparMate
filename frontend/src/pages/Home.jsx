/* =========================
   pages/Home.jsx
========================= */
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import CategoriesSection from "../components/sections/CategoriesSection";
import BillingSection from "../components/sections/BillingSection";

//import Hero from "../components/Hero";
export default function Home() {
  return (
    <div className="bg-white text-gray-900">
   <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <BillingSection />
      </main>
      <Footer />
    </div>
  );
}

