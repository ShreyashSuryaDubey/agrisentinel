import QuerySection from "@/components/QuerySection";
import { useLanguage } from "@/contexts/LanguageContext";

const AskQuestion = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("askYourFarmingQuestion")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("aiAssistantReady")}
          </p>
        </div>
        <QuerySection />
      </div>
    </div>
  );
};

export default AskQuestion;