import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Wheat, Bug, Droplets, Sun, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuerySection = () => {
  const [query, setQuery] = useState("");
  const [cropType, setCropType] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter your farming question.",
        variant: "destructive",
      });
      return;
    }

    // Simulate AI response
    toast({
      title: "Query Submitted!",
      description: "Our AI is analyzing your question. You'll receive a response shortly.",
    });

    // Clear form
    setQuery("");
    setCropType("");
    setCategory("");
  };

  const quickQuestions = [
    { icon: <Bug className="h-5 w-5" />, text: "How to identify pest damage on tomatoes?" },
    { icon: <Droplets className="h-5 w-5" />, text: "Best irrigation schedule for wheat?" },
    { icon: <Sun className="h-5 w-5" />, text: "Optimal planting time for corn in my region?" },
    { icon: <Leaf className="h-5 w-5" />, text: "Natural fertilizers for organic farming?" },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ask Your Farming Question
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI assistant is ready to help with any agricultural challenge you're facing.
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
                        <Label htmlFor="crop-type">Crop Type</Label>
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
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
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
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="query">Your Question</Label>
                      <Textarea
                        id="query"
                        placeholder="Describe your farming question or challenge in detail..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="min-h-32"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-gradient-primary hover:opacity-90">
                      <Send className="mr-2 h-5 w-5" />
                      Get AI Assistance
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
    </section>
  );
};

export default QuerySection;