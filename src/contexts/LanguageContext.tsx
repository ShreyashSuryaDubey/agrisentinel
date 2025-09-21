import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ml';

interface Translations {
  en: {
    [key: string]: string;
  };
  ml: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    home: "Home",
    askQuestion: "Ask Question",
    queryHistory: "Query History",
    profile: "Profile",
    
    // Hero Section
    heroTitle: "AI-Powered Agricultural Assistant",
    heroSubtitle: "Get expert farming advice powered by artificial intelligence. From crop management to pest control, we're here to help your farm thrive.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // Query Section
    askYourFarmingQuestion: "Ask Your Farming Question",
    aiAssistantReady: "Our AI assistant is ready to help with any agricultural challenge you're facing.",
    submitYourQuestion: "Submit Your Question",
    cropType: "Crop Type",
    selectCropType: "Select crop type",
    category: "Category",
    selectCategory: "Select category",
    yourQuestion: "Your Question",
    questionPlaceholder: "Describe your farming question or challenge in detail...",
    attachImage: "Attach Image",
    recordVoice: "Record Voice",
    stopRecording: "Stop Recording",
    getAIAssistance: "Get AI Assistance",
    quickQuestions: "Quick Questions",
    
    // Sample responses
    identifyPestDamage: "How to identify pest damage on tomatoes?",
    bestIrrigationSchedule: "Best irrigation schedule for wheat?",
    optimalPlantingTime: "Optimal planting time for corn in my region?",
    naturalFertilizers: "Natural fertilizers for organic farming?",
    
    // Crop types
    wheat: "Wheat",
    corn: "Corn",
    rice: "Rice",
    tomatoes: "Tomatoes",
    soybeans: "Soybeans",
    potatoes: "Potatoes",
    other: "Other",
    
    // Categories
    pestControl: "Pest Control",
    irrigation: "Irrigation",
    fertilization: "Fertilization",
    diseaseManagement: "Disease Management",
    plantingHarvesting: "Planting & Harvesting",
    equipment: "Equipment",
    general: "General",
    
    // Messages
    queryRequired: "Query Required",
    enterFarmingQuestion: "Please enter your farming question.",
    querySubmitted: "Query Submitted!",
    aiAnalyzing: "Our AI is analyzing your question. You'll receive a response shortly.",
    imageUploaded: "Image Uploaded",
    imageUploadedSuccess: "Image uploaded successfully!",
    voiceRecorded: "Voice Recorded",
    voiceRecordedSuccess: "Voice recording completed successfully!",
    microphoneError: "Microphone Error",
    microphoneAccessDenied: "Unable to access microphone. Please check permissions.",
    
    // Language
    language: "Language",
    english: "English",
    malayalam: "Malayalam",
  },
  ml: {
    // Navigation
    home: "ഹോം",
    askQuestion: "ചോദ്യം ചോദിക്കുക",
    queryHistory: "ചോദ്യ ചരിത്രം",
    profile: "പ്രൊഫൈൽ",
    
    // Hero Section
    heroTitle: "AI-പവർഡ് കൃഷി സഹായി",
    heroSubtitle: "കൃത്രിമ ബുദ്ധിയാൽ പ്രവർത്തിക്കുന്ന വിദഗ്ധ കൃഷി ഉപദേശം നേടുക. വിള പരിപാലനം മുതൽ കീട നിയന്ത്രണം വരെ, നിങ്ങളുടെ കൃഷി അഭിവൃദ്ധിപ്പെടുത്താൻ ഞങ്ങൾ ഇവിടെയുണ്ട്.",
    getStarted: "ആരംഭിക്കുക",
    learnMore: "കൂടുതൽ അറിയുക",
    
    // Query Section
    askYourFarmingQuestion: "നിങ്ങളുടെ കൃഷി ചോദ്യം ചോദിക്കുക",
    aiAssistantReady: "നിങ്ങൾ നേരിടുന്ന ഏതൊരു കാർഷിക വെല്ലുവിളിയിലും സഹായിക്കാൻ ഞങ്ങളുടെ AI അസിസ്റ്റന്റ് തയ്യാറാണ്.",
    submitYourQuestion: "നിങ്ങളുടെ ചോദ്യം സമർപ്പിക്കുക",
    cropType: "വിള തരം",
    selectCropType: "വിള തരം തിരഞ്ഞെടുക്കുക",
    category: "വിഭാഗം",
    selectCategory: "വിഭാഗം തിരഞ്ഞെടുക്കുക",
    yourQuestion: "നിങ്ങളുടെ ചോദ്യം",
    questionPlaceholder: "നിങ്ങളുടെ കൃഷി ചോദ്യം അല്ലെങ്കിൽ വെല്ലുവിളി വിശദമായി വിവരിക്കുക...",
    attachImage: "ചിത്രം അറ്റാച്ച് ചെയ്യുക",
    recordVoice: "ശബ്ദം റെക്കോർഡ് ചെയ്യുക",
    stopRecording: "റെക്കോർഡിംഗ് നിർത്തുക",
    getAIAssistance: "AI സഹായം നേടുക",
    quickQuestions: "പെട്ടെന്നുള്ള ചോദ്യങ്ങൾ",
    
    // Sample responses
    identifyPestDamage: "തക്കാളിയിലെ കീട നാശം എങ്ങനെ തിരിച്ചറിയാം?",
    bestIrrigationSchedule: "ഗോതമ്പിനുള്ള മികച്ച ജലസേചന സമയക്രമം?",
    optimalPlantingTime: "എന്റെ പ്രദേശത്ത് ചോളത്തിന്റെ ഒപ്റ്റിമൽ നടീൽ സമയം?",
    naturalFertilizers: "ജൈവ കൃഷിക്കുള്ള പ്രകൃതിദത്ത വളങ്ങൾ?",
    
    // Crop types
    wheat: "ഗോതമ്പ്",
    corn: "ചോളം",
    rice: "നെല്ല്",
    tomatoes: "തക്കാളി",
    soybeans: "സോയാബീൻ",
    potatoes: "ഉരുളക്കിഴങ്ങ്",
    other: "മറ്റുള്ളവ",
    
    // Categories
    pestControl: "കീട നിയന്ത്രണം",
    irrigation: "ജലസേചനം",
    fertilization: "വളപ്രയോഗം",
    diseaseManagement: "രോഗ പരിപാലനം",
    plantingHarvesting: "നടീൽ & വിളവെടുപ്പ്",
    equipment: "ഉപകരണങ്ങൾ",
    general: "പൊതുവായ",
    
    // Messages
    queryRequired: "ചോദ്യം ആവശ്യമാണ്",
    enterFarmingQuestion: "ദയവായി നിങ്ങളുടെ കൃഷി ചോദ്യം നൽകുക.",
    querySubmitted: "ചോദ്യം സമർപ്പിച്ചു!",
    aiAnalyzing: "ഞങ്ങളുടെ AI നിങ്ങളുടെ ചോദ്യം വിശകലനം ചെയ്യുന്നു. നിങ്ങൾക്ക് ഉടൻ ഉത്തരം ലഭിക്കും.",
    imageUploaded: "ചിത്രം അപ്‌ലോഡ് ചെയ്തു",
    imageUploadedSuccess: "ചിത്രം വിജയകരമായി അപ്‌ലോഡ് ചെയ്തു!",
    voiceRecorded: "ശബ്ദം റെക്കോർഡ് ചെയ്തു",
    voiceRecordedSuccess: "ശബ്ദ റെക്കോർഡിംഗ് വിജയകരമായി പൂർത്തിയാക്കി!",
    microphoneError: "മൈക്രോഫോൺ പിശക്",
    microphoneAccessDenied: "മൈക്രോഫോൺ ആക്സസ് ചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി അനുമതികൾ പരിശോധിക്കുക.",
    
    // Language
    language: "ഭാഷ",
    english: "ഇംഗ്ലീഷ്",
    malayalam: "മലയാളം",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};