import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Wheat, Bug, Droplets, Sun, Leaf, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AskQuestion = () => {
  const [query, setQuery] = useState("");
  const [cropType, setCropType] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter your farming question.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create mock response and store in localStorage
    const mockResponse = generateMockResponse(query, category, cropType);
    const queryData = {
      id: Date.now().toString(),
      question: query,
      category: category || "General",
      cropType: cropType || "General",
      response: mockResponse,
      timestamp: new Date().toISOString(),
      status: "resolved"
    };

    // Store in localStorage
    const existingQueries = JSON.parse(localStorage.getItem("farmerQueries") || "[]");
    existingQueries.unshift(queryData);
    localStorage.setItem("farmerQueries", JSON.stringify(existingQueries));

    toast({
      title: "Response Generated!",
      description: "Your AI response is ready. Redirecting...",
    });

    // Redirect to results page
    setTimeout(() => {
      navigate(`/results/${queryData.id}`);
    }, 1000);
  };

  const generateMockResponse = (question: string, category: string, crop: string) => {
    // Intelligent mock responses based on keywords
    const lowercaseQ = question.toLowerCase();
    
    if (lowercaseQ.includes("pest") || lowercaseQ.includes("bug") || lowercaseQ.includes("insect")) {
      return `For pest management in ${crop || 'your crop'}, I recommend an integrated approach: 1) Regular monitoring using yellow sticky traps, 2) Biological control with beneficial insects like ladybugs or parasitic wasps, 3) Neem oil application (2-3ml per liter) during early morning hours, 4) Companion planting with marigolds or nasturtiums to naturally repel pests. Avoid broad-spectrum pesticides that harm beneficial insects. Monitor weekly and act early when pest populations are detected.`;
    }
    
    if (lowercaseQ.includes("water") || lowercaseQ.includes("irrigat") || lowercaseQ.includes("drought")) {
      return `Optimal irrigation for ${crop || 'your crop'} requires monitoring soil moisture at root zone depth (15-30cm). Water when soil reaches 50-60% field capacity. Use drip irrigation for 80% efficiency vs 40% for flood irrigation. During flowering/fruiting stages, maintain consistent moisture - avoid water stress. Install moisture sensors for precise monitoring. Water early morning (5-8 AM) to reduce evaporation and disease risk.`;
    }
    
    if (lowercaseQ.includes("disease") || lowercaseQ.includes("fungus") || lowercaseQ.includes("rot")) {
      return `Disease prevention is key for ${crop || 'your crop'}. Ensure proper air circulation with adequate plant spacing. Apply preventive fungicide sprays containing copper or sulfur before disease onset. Remove infected plant debris immediately. Practice crop rotation to break disease cycles. Avoid overhead watering which promotes fungal growth. Use resistant varieties when available. For treatment, apply systemic fungicides containing propiconazole or tebuconazole as directed.`;
    }
    
    if (lowercaseQ.includes("fertiliz") || lowercaseQ.includes("nutri") || lowercaseQ.includes("npk")) {
      return `For balanced nutrition in ${crop || 'your crop'}, conduct soil testing first to determine nutrient needs. Generally apply NPK in ratio 4:2:1 for vegetative growth, 2:3:2 for flowering/fruiting. Organic options include compost (5-10 tons/hectare), vermicompost, and green manures. Split nitrogen applications - 50% at planting, 25% at vegetative stage, 25% at flowering. Supplement with micronutrients like zinc, boron, and iron based on soil test results.`;
    }
    
    if (lowercaseQ.includes("plant") || lowercaseQ.includes("seed") || lowercaseQ.includes("sow")) {
      return `For optimal planting of ${crop || 'your crop'}, consider your local climate and season. Plant seeds at 2-3 times their diameter depth. Ensure soil temperature is appropriate (varies by crop - generally 15-25°C for most crops). Space plants according to mature size requirements. Use quality certified seeds with high germination rates. Prepare soil with organic matter 2-3 weeks before planting. Monitor soil moisture - keep consistently moist but not waterlogged during germination.`;
    }
    
    // Default general response
    return `Thank you for your question about ${crop || 'farming'}. Based on agricultural best practices, I recommend: 1) Regular field monitoring to catch issues early, 2) Maintaining detailed records of your farming activities, 3) Consulting with local agricultural extension services for region-specific advice, 4) Implementing integrated management practices combining organic and scientific methods, 5) Staying updated on latest farming techniques and climate patterns. For specific treatment recommendations, please provide more details about your current situation and local growing conditions.`;
  };

  const quickQuestions = [
    { icon: <Bug className="h-5 w-5" />, text: "How to identify and treat aphids on my tomato plants?" },
    { icon: <Droplets className="h-5 w-5" />, text: "What's the best irrigation schedule for wheat during flowering?" },
    { icon: <Sun className="h-5 w-5" />, text: "When should I plant corn in my region for maximum yield?" },
    { icon: <Leaf className="h-5 w-5" />, text: "Which organic fertilizers work best for vegetable gardens?" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ask Your Farming Question
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant AI-powered advice for any agricultural challenge you're facing.
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
                    Submit Your Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="crop-type">Crop Type (Optional)</Label>
                        <Select value={cropType} onValueChange={setCropType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="corn">Corn</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="tomatoes">Tomatoes</SelectItem>
                            <SelectItem value="soybeans">Soybeans</SelectItem>
                            <SelectItem value="potatoes">Potatoes</SelectItem>
                            <SelectItem value="cotton">Cotton</SelectItem>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                            <SelectItem value="fruits">Fruits</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category (Optional)</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pest-control">Pest Control</SelectItem>
                            <SelectItem value="irrigation">Irrigation</SelectItem>
                            <SelectItem value="fertilization">Fertilization</SelectItem>
                            <SelectItem value="disease">Disease Management</SelectItem>
                            <SelectItem value="planting">Planting & Harvesting</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="soil">Soil Management</SelectItem>
                            <SelectItem value="weather">Weather & Climate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="query">Your Question *</Label>
                      <Textarea
                        id="query"
                        placeholder="Describe your farming question or challenge in detail..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="min-h-32"
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-primary hover:opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing Question...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Get AI Assistance
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Questions */}
            <div>
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(question.text)}
                      className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent/50 hover:border-primary/30 transition-all duration-200 group"
                      disabled={isSubmitting}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-primary group-hover:text-primary-dark transition-colors">
                          {question.icon}
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {question.text}
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
    </div>
  );
};

export default AskQuestion;