import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, MapPin, Sprout, Save, BarChart3, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  location: string;
  farmSize: string;
  primaryCrops: string;
  farmingExperience: string;
  farmingType: string;
  bio: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Smith",
    email: "john.smith@email.com",
    location: "Iowa, USA",
    farmSize: "500",
    primaryCrops: "Corn, Soybeans",
    farmingExperience: "15",
    farmingType: "conventional",
    bio: "Third-generation farmer focused on sustainable corn and soybean production. Always looking to learn new techniques and improve crop yields."
  });
  
  const [stats, setStats] = useState({
    totalQueries: 0,
    resolvedQueries: 0,
    favoriteCategory: "General"
  });

  const { toast } = useToast();

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    // Calculate stats from queries
    const queries = JSON.parse(localStorage.getItem("farmerQueries") || "[]");
    const categoryCount: { [key: string]: number } = {};
    
    queries.forEach((query: any) => {
      categoryCount[query.category] = (categoryCount[query.category] || 0) + 1;
    });

    const favoriteCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b, "General"
    );

    setStats({
      totalQueries: queries.length,
      resolvedQueries: queries.filter((q: any) => q.status === "resolved").length,
      favoriteCategory: categoryCount[favoriteCategory] ? favoriteCategory : "General"
    });
  }, []);

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    toast({
      title: "Profile Saved",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
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
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Iowa, USA"
                    value={profile.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Farm Size (acres)</Label>
                    <Input
                      id="farmSize"
                      type="number"
                      placeholder="e.g., 500"
                      value={profile.farmSize}
                      onChange={(e) => handleInputChange("farmSize", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmingExperience">Years of Experience</Label>
                    <Input
                      id="farmingExperience"
                      type="number"
                      placeholder="e.g., 15"
                      value={profile.farmingExperience}
                      onChange={(e) => handleInputChange("farmingExperience", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryCrops">Primary Crops</Label>
                  <Input
                    id="primaryCrops"
                    placeholder="e.g., Corn, Soybeans, Wheat"
                    value={profile.primaryCrops}
                    onChange={(e) => handleInputChange("primaryCrops", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmingType">Farming Type</Label>
                  <Select value={profile.farmingType} onValueChange={(value) => handleInputChange("farmingType", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conventional">Conventional</SelectItem>
                      <SelectItem value="organic">Organic</SelectItem>
                      <SelectItem value="sustainable">Sustainable</SelectItem>
                      <SelectItem value="regenerative">Regenerative</SelectItem>
                      <SelectItem value="mixed">Mixed Methods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your farming background and interests..."
                    value={profile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="min-h-24"
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
                  <span className="text-sm">{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.primaryCrops}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {profile.farmSize} acres • {profile.farmingExperience} years experience
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {profile.farmingType} farming
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