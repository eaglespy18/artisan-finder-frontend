import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search/SearchBar";
import { ArrowRight, Users, Shield, Clock } from "lucide-react";


const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (skill: string, location: string) => {
    const params = new URLSearchParams();
    if (skill && skill !== "All Skills") params.set("skill", skill);
    if (location && location !== "All Locations") params.set("location", location);
    
    navigate(`/search?${params.toString()}`);
  };

  const features = [
    {
      icon: Users,
      title: "Verified Artisans",
      description: "All artisans are verified with proven experience and skills"
    },
    {
      icon: Shield,
      title: "Trusted Platform", 
      description: "Safe and secure platform with ratings and reviews"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Connect with available artisans in your area instantly"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32 bg-hero-gradient text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Skilled Artisans
            <br />
            <span className="text-white/90">Near You</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-3xl mx-auto">
            Connect with experienced carpenters, plumbers, tailors, mechanics and more. 
            Quality craftsmanship at your fingertips.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} className="bg-white/10 backdrop-blur border-white/20" />
          </div>
          
          <div className="mt-8">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => navigate("/search")}
              className="bg-white text-primary hover:bg-white/90"
            >
              Browse All Artisans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Artisan Finder?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find and connect with skilled professionals in your area
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-lg bg-card shadow-card">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found the perfect artisan for their needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/search")}>
              Find Artisans
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/register")}>
              Join as Artisan
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;