import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/HeroSection";
import SampleResponses from "@/components/SampleResponses";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t("askYourFarmingQuestion")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("aiAssistantReady")}
            </p>
          </div>
          <div className="max-w-md mx-auto text-center">
            <a
              href="/ask"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2"
            >
              {t("getStarted")}
            </a>
          </div>
        </div>
      </div>
      <SampleResponses />
    </div>
  );
};

export default Index;
