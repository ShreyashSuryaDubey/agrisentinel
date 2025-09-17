import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import QuerySection from "@/components/QuerySection";
import SampleResponses from "@/components/SampleResponses";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <QuerySection />
      <SampleResponses />
    </div>
  );
};

export default Index;
