import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";

const SampleResponses = () => {
  const responses = [
    {
      question: "How do I identify and treat brown spot disease in my rice crop?",
      category: "Disease Management",
      response: "Brown spot disease in rice is caused by the fungus Bipolaris oryzae. Key identification signs include small, circular brown spots on leaves with yellow halos. Treatment involves applying fungicides containing propiconazole or tebuconazole at early stages. Ensure proper field drainage and avoid excessive nitrogen fertilization to prevent recurrence.",
      status: "resolved",
      timeAgo: "2 hours ago"
    },
    {
      question: "What's the optimal irrigation schedule for wheat during flowering stage?",
      category: "Irrigation",
      response: "During the flowering stage, wheat requires consistent moisture. Irrigate every 7-10 days with 25-30mm of water. Monitor soil moisture at 15-20cm depth - irrigate when it drops to 50-60% field capacity. Avoid water stress during anthesis (10-15 days after flowering) as it directly impacts grain formation and yield.",
      status: "resolved",
      timeAgo: "5 hours ago"
    },
    {
      question: "Best organic methods to control aphids on tomato plants?",
      category: "Pest Control",
      response: "Effective organic aphid control includes: 1) Neem oil spray (2-3ml per liter) applied in early morning, 2) Introduce beneficial insects like ladybugs and lacewings, 3) Use reflective mulch to confuse aphids, 4) Spray soapy water solution (5ml dish soap per liter). Companion planting with marigolds and nasturtiums also helps deter aphids naturally.",
      status: "in-progress",
      timeAgo: "1 day ago"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Sample AI Responses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our AI provides detailed, actionable farming advice to real questions from farmers.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {responses.map((item, index) => (
            <Card key={index} className="shadow-natural hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground mb-2">
                      {item.question}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {item.timeAgo}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === "resolved" ? (
                      <div className="flex items-center gap-1 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-medium">Resolved</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-accent">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-sm font-medium">In Progress</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-foreground leading-relaxed">
                    {item.response}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Ready to get personalized farming advice? 
            <span className="text-primary font-medium ml-1">Ask your question above!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SampleResponses;