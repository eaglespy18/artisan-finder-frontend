import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Star, MapPin, Phone, Briefcase, User } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Artisan {
  id: number;
  name: string;
  skill: string;
  location: string;
  phone: string;
  experience: string;
  description?: string;
  rating?: number;
  completedJobs?: number;
  avatar?: string;
}

const ArtisanProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArtisan();
  }, [id]);

  const fetchArtisan = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/artisans/${id}`);
      if (!response.ok) {
        throw new Error("Artisan not found");
      }
      const data = await response.json();
      setArtisan(data);
    } catch (err) {
      setError("Failed to load artisan profile. Please try again later.");
      console.error("Error fetching artisan:", err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg text-muted-foreground">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg text-destructive mb-4">{error}</p>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4">
                  <AvatarImage src={artisan.avatar} alt={artisan.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {getInitials(artisan.name)}
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="text-2xl font-bold text-card-foreground mb-2">
                  {artisan.name}
                </h1>
                
                <Badge variant="secondary" className="mb-4 text-sm">
                  {artisan.skill}
                </Badge>
                
                {artisan.rating && (
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">{artisan.rating}</span>
                    <span className="text-muted-foreground">rating</span>
                  </div>
                )}
                
                {artisan.completedJobs && (
                  <p className="text-muted-foreground mb-4">
                    {artisan.completedJobs} jobs completed
                  </p>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>{artisan.location}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>{artisan.phone}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>{artisan.experience} experience</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <Button className="w-full" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Artisan
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                About {artisan.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {artisan.description || `${artisan.name} is a skilled ${artisan.skill.toLowerCase()} with ${artisan.experience} of experience in the field. Based in ${artisan.location}, they are committed to providing quality workmanship and excellent customer service.`}
              </p>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{artisan.skill}</Badge>
                  <Badge variant="outline">Quality Workmanship</Badge>
                  <Badge variant="outline">Reliable Service</Badge>
                  <Badge variant="outline">Customer Focused</Badge>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Experience</h3>
                <p className="text-muted-foreground">
                  {artisan.experience} of professional experience in {artisan.skill.toLowerCase()} work, 
                  serving customers in {artisan.location} and surrounding areas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;