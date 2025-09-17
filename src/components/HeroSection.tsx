import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, MessageCircle, Brain, Users } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-hero">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Sprout className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            AI-Powered
            <span className="text-primary block">Farming Support</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant answers to your farming questions with our advanced AI assistant. 
            From crop management to pest control, we're here to help you grow better.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-natural">
              <MessageCircle className="mr-2 h-5 w-5" />
              Ask a Question
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Brain className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart AI Responses</h3>
              <p className="text-muted-foreground">
                Advanced AI trained on agricultural knowledge to provide accurate, actionable advice.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Knowledge</h3>
              <p className="text-muted-foreground">
                Backed by agricultural experts and real-world farming experiences from around the world.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Sprout className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Crop Specific</h3>
              <p className="text-muted-foreground">
                Tailored advice for different crops, regions, and farming methods to maximize your yield.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;