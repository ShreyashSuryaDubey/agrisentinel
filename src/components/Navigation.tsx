import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sprout, MessageCircle, History, User, Home, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You've been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { to: "/", icon: <Home className="h-4 w-4" />, label: t("home") },
    { to: "/ask", icon: <MessageCircle className="h-4 w-4" />, label: t("askQuestion") },
    { to: "/history", icon: <History className="h-4 w-4" />, label: t("queryHistory") },
    { to: "/profile", icon: <User className="h-4 w-4" />, label: t("profile") },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <Sprout className="h-6 w-6" />
            AI Farm Assistant
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.to}
                asChild
                variant={location.pathname === item.to ? "default" : "ghost"}
                size="sm"
              >
                <Link to={item.to} className="flex items-center gap-2">
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            ))}
            <div className="hidden md:block ml-2">
              <LanguageSwitcher />
            </div>
            <Button variant="ghost" onClick={handleSignOut} className="text-muted-foreground hover:text-foreground ml-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;