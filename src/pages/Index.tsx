import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import SpecsSection from "@/components/site/SpecsSection";
import BondSection from "@/components/site/BondSection";
import InquiryForm from "@/components/site/InquiryForm";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <SpecsSection />
        <BondSection />
        <InquiryForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
