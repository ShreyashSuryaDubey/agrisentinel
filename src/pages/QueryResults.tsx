import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowLeft, Share2, Copy, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useDemoMode } from "@/contexts/DemoContext";

interface QueryData {
  id: string;
  question: string;
  category: string;
  crop_type: string | null;
  response: string;
  created_at: string;
  status: string;
}

const QueryResults = () => {
  const { id } = useParams();
  const [queryData, setQueryData] = useState<QueryData | null>(null);
  const { toast } = useToast();
  const { isDemoMode, demoUserId } = useDemoMode();

  useEffect(() => {
    const fetchQuery = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('farmer_queries')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setQueryData(data);
      } catch (error: any) {
        console.error('Error fetching query:', error);
        setQueryData(null);
      }
    };

    fetchQuery();
  }, [id]);

  const handleCopyResponse = () => {
    if (queryData) {
      navigator.clipboard.writeText(queryData.response);
      toast({
        title: "Copied!",
        description: "Response copied to clipboard.",
      });
    }
  };

  const handleShare = () => {
    if (queryData) {
      const shareText = `Q: ${queryData.question}\n\nA: ${queryData.response}`;
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Shared!",
        description: "Question and answer copied for sharing.",
      });
    }
  };

  if (!queryData) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Query Not Found</h1>
          <p className="text-muted-foreground mb-6">The query you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/ask">Ask a New Question</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/history" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to My Queries
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Question Card */}
          <Card className="shadow-elevated mb-6">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl text-foreground mb-3">
                    Your Question
                  </CardTitle>
                  <p className="text-lg text-foreground leading-relaxed">
                    {queryData.question}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Resolved</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {queryData.category}
                </Badge>
                {queryData.crop_type && (
                  <Badge variant="outline" className="border-accent/30 text-accent">
                    {queryData.crop_type}
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  {new Date(queryData.created_at).toLocaleDateString()} at{" "}
                  {new Date(queryData.created_at).toLocaleTimeString()}
                </span>
              </div>
            </CardHeader>
          </Card>

          {/* AI Response Card */}
          <Card className="shadow-elevated mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  AI Response
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyResponse}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-6 rounded-lg border-l-4 border-primary">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {queryData.response}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/ask">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask Another Question
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/history">
                View All My Queries
              </Link>
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-muted/20 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Disclaimer:</strong> This AI-generated advice is for informational purposes only. 
              Always consult with local agricultural experts and extension services for location-specific recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryResults;