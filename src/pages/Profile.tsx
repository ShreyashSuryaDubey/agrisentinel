import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, MapPin, Sprout, Save, BarChart3, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  full_name: string;
  farm_location: string;
  farm_size: string;
  primary_crops: string[];
  farming_experience: string;
  phone_number: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    full_name: "",
    farm_location: "",
    farm_size: "",
    primary_crops: [],
    farming_experience: "",
    phone_number: ""
  });
  
  const [stats, setStats] = useState({
    totalQueries: 0,
    resolvedQueries: 0,
    favoriteCategory: "General"
  });

  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
    loadStats();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
    }
  };

  const loadStats = async () => {
    try {
      const { data: queries, error } = await supabase
        .from('farmer_queries')
        .select('*');

      if (error) throw error;

      const categoryCount: { [key: string]: number } = {};
      
      queries?.forEach((query: any) => {
        categoryCount[query.category] = (categoryCount[query.category] || 0) + 1;
      });

      const favoriteCategory = Object.keys(categoryCount).reduce((a, b) => 
        categoryCount[a] > categoryCount[b] ? a : b, "General"
      );

      setStats({
        totalQueries: queries?.length || 0,
        resolvedQueries: queries?.filter((q: any) => q.status === "completed").length || 0,
        favoriteCategory: categoryCount[favoriteCategory] ? favoriteCategory : "General"
      });
    } catch (error: any) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('profiles')
        .upsert([
          {
            user_id: user.id,
            ...profile
          }
        ]);

      if (error) throw error;

      toast({
        title: "Profile Saved",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string | string[]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            My Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your farming profile and view your activity statistics
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone_number}
                      onChange={(e) => handleInputChange("phone_number", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Farm Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Iowa, USA"
                    value={profile.farm_location}
                    onChange={(e) => handleInputChange("farm_location", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Farm Size (acres)</Label>
                    <Input
                      id="farmSize"
                      type="number"
                      placeholder="e.g., 500"
                      value={profile.farm_size}
                      onChange={(e) => handleInputChange("farm_size", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmingExperience">Years of Experience</Label>
                    <Input
                      id="farmingExperience"
                      type="number"
                      placeholder="e.g., 15"
                      value={profile.farming_experience}
                      onChange={(e) => handleInputChange("farming_experience", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryCrops">Primary Crops (comma-separated)</Label>
                  <Input
                    id="primaryCrops"
                    placeholder="e.g., Corn, Soybeans, Wheat"
                    value={profile.primary_crops.join(', ')}
                    onChange={(e) => handleInputChange("primary_crops", e.target.value.split(',').map(crop => crop.trim()))}
                  />
                </div>

                <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Sidebar */}
          <div className="space-y-6">
            {/* Activity Stats */}
            <Card className="shadow-natural">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Activity Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stats.totalQueries}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Questions Asked
                  </div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stats.resolvedQueries}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Questions Resolved
                  </div>
                </div>

                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {stats.favoriteCategory}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Most Queried Topic
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="shadow-natural">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sprout className="h-5 w-5 text-primary" />
                  Farm Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.farm_location || "Location not set"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.primary_crops.join(', ') || "Crops not set"}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {profile.farm_size ? `${profile.farm_size} acres` : "Farm size not set"} • {profile.farming_experience ? `${profile.farming_experience} years experience` : "Experience not set"}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-natural">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button asChild className="w-full bg-gradient-primary hover:opacity-90">
                    <a href="/ask">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Ask New Question
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/history">
                      View Query History
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;