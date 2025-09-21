import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Wheat, Bug, Droplets, Sun, Leaf, Camera, Mic, MicOff, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";

const QuerySection = () => {
  const [query, setQuery] = useState("");
  const [cropType, setCropType] = useState("");
  const [category, setCategory] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const { t } = useLanguage();
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      
      toast({
        title: t("imageUploaded"),
        description: t("imageUploadedSuccess"),
      });
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVoiceRecord = async () => {
    if (isRecording) {
      try {
        const audioData = await stopRecording();
        if (audioData) {
          toast({
            title: t("voiceRecorded"),
            description: t("voiceRecordedSuccess"),
          });
          // Here you could add voice-to-text conversion
        }
      } catch (error) {
        toast({
          title: t("microphoneError"),
          description: t("microphoneAccessDenied"),
          variant: "destructive",
        });
      }
    } else {
      try {
        await startRecording();
      } catch (error) {
        toast({
          title: t("microphoneError"),
          description: t("microphoneAccessDenied"),
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: t("queryRequired"),
        description: t("enterFarmingQuestion"),
        variant: "destructive",
      });
      return;
    }

    // Simulate AI response
    toast({
      title: t("querySubmitted"),
      description: t("aiAnalyzing"),
    });

    // Clear form
    setQuery("");
    setCropType("");
    setCategory("");
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const quickQuestions = [
    { icon: <Bug className="h-5 w-5" />, textKey: "identifyPestDamage" },
    { icon: <Droplets className="h-5 w-5" />, textKey: "bestIrrigationSchedule" },
    { icon: <Sun className="h-5 w-5" />, textKey: "optimalPlantingTime" },
    { icon: <Leaf className="h-5 w-5" />, textKey: "naturalFertilizers" },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t("askYourFarmingQuestion")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("aiAssistantReady")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Query Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wheat className="h-6 w-6 text-primary" />
                    {t("submitYourQuestion")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="crop-type">{t("cropType")}</Label>
                        <Select value={cropType} onValueChange={setCropType}>
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectCropType")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wheat">{t("wheat")}</SelectItem>
                            <SelectItem value="corn">{t("corn")}</SelectItem>
                            <SelectItem value="rice">{t("rice")}</SelectItem>
                            <SelectItem value="tomatoes">{t("tomatoes")}</SelectItem>
                            <SelectItem value="soybeans">{t("soybeans")}</SelectItem>
                            <SelectItem value="potatoes">{t("potatoes")}</SelectItem>
                            <SelectItem value="other">{t("other")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">{t("category")}</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectCategory")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pest-control">{t("pestControl")}</SelectItem>
                            <SelectItem value="irrigation">{t("irrigation")}</SelectItem>
                            <SelectItem value="fertilization">{t("fertilization")}</SelectItem>
                            <SelectItem value="disease">{t("diseaseManagement")}</SelectItem>
                            <SelectItem value="planting">{t("plantingHarvesting")}</SelectItem>
                            <SelectItem value="equipment">{t("equipment")}</SelectItem>
                            <SelectItem value="general">{t("general")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="query">{t("yourQuestion")}</Label>
                      <Textarea
                        id="query"
                        placeholder={t("questionPlaceholder")}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="min-h-32"
                      />
                    </div>

                    {/* Image Upload and Voice Recording */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex-1 min-w-[200px]">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                          id="image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full"
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          {t("attachImage")}
                        </Button>
                      </div>
                      
                      <div className="flex-1 min-w-[200px]">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleVoiceRecord}
                          className={`w-full ${isRecording ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' : ''}`}
                        >
                          {isRecording ? (
                            <>
                              <MicOff className="mr-2 h-4 w-4" />
                              {t("stopRecording")}
                            </>
                          ) : (
                            <>
                              <Mic className="mr-2 h-4 w-4" />
                              {t("recordVoice")}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="relative">
                        <div className="relative w-full max-w-xs mx-auto">
                          <img
                            src={imagePreview}
                            alt="Uploaded"
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <Button type="submit" size="lg" className="w-full bg-gradient-primary hover:opacity-90">
                      <Send className="mr-2 h-5 w-5" />
                      {t("getAIAssistance")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Questions */}
            <div>
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle className="text-lg">{t("quickQuestions")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(t(question.textKey))}
                      className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent/50 hover:border-primary/30 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-primary group-hover:text-primary-dark transition-colors">
                          {question.icon}
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {t(question.textKey)}
                        </span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuerySection;