import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Search, MessageCircle, Calendar, Filter, Trash2 } from "lucide-react";
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

const QueryHistory = () => {
  const [queries, setQueries] = useState<QueryData[]>([]);
  const [filteredQueries, setFilteredQueries] = useState<QueryData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const { toast } = useToast();
  const { isDemoMode, demoUserId } = useDemoMode();

  useEffect(() => {
    loadQueries();
  }, []);

  useEffect(() => {
    filterQueries();
  }, [queries, searchTerm, filterCategory]);

  const loadQueries = async () => {
    try {
      let query = supabase
        .from('farmer_queries')
        .select('*')
        .order('created_at', { ascending: false });

      if (isDemoMode) {
        query = query.eq('user_id', demoUserId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setQueries(data || []);
    } catch (error: any) {
      console.error('Error loading queries:', error);
      setQueries([]);
    }
  };

  const filterQueries = () => {
    let filtered = queries;

    if (searchTerm) {
      filtered = filtered.filter(query =>
        query.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.response.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(query => query.category === filterCategory);
    }

    setFilteredQueries(filtered);
  };

  const deleteQuery = async (id: string) => {
    try {
      const { error } = await supabase
        .from('farmer_queries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const updatedQueries = queries.filter(query => query.id !== id);
      setQueries(updatedQueries);
      
      toast({
        title: "Query Deleted",
        description: "The query has been removed from your history.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const clearAllQueries = async () => {
    try {
      let userId: string;
      
      if (isDemoMode) {
        userId = demoUserId;
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");
        userId = user.id;
      }

      const { error } = await supabase
        .from('farmer_queries')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      setQueries([]);
      toast({
        title: "History Cleared",
        description: "All queries have been removed from your history.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Remove the sample queries section and the related useEffect
  // This is no longer needed since we're using Supabase

  const categories = ["all", "Pest Control", "Irrigation", "Fertilization", "Disease Management", "Planting & Harvesting", "Equipment", "Soil Management", "Weather & Climate", "General"];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            My Query History
          </h1>
          <p className="text-xl text-muted-foreground">
            Review your past questions and AI responses
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count and Clear Button */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredQueries.length} {filteredQueries.length === 1 ? 'query' : 'queries'} found
          </p>
          {queries.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAllQueries}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Queries List */}
        {filteredQueries.length === 0 ? (
          <Card className="shadow-natural">
            <CardContent className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Queries Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || filterCategory !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "You haven't asked any questions yet. Start by asking your first farming question!"
                }
              </p>
              <Button asChild>
                <Link to="/ask">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Ask Your First Question
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredQueries.map((query) => (
              <Card key={query.id} className="shadow-natural hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground mb-2 line-clamp-2">
                        {query.question}
                      </CardTitle>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          {query.category}
                        </Badge>
                        {query.crop_type && (
                          <Badge variant="outline" className="border-accent/30 text-accent">
                            {query.crop_type}
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(query.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium">Resolved</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteQuery(query.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {query.response}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/results/${query.id}`}>
                      View Full Response
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Action */}
        {filteredQueries.length > 0 && (
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/ask">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask Another Question
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryHistory;