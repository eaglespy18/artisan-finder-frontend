import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Phone, Briefcase } from "lucide-react";

interface Artisan {
  id: number;
  name: string;
  skill: string;
  location: string;
  phone: string;
  experience: string;
  rating?: number;
  completedJobs?: number;
  avatar?: string;
}

interface ArtisanCardProps {
  artisan: Artisan;
}

const ArtisanCard = ({ artisan }: ArtisanCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 border-0 shadow-card bg-card">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={artisan.avatar} alt={artisan.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              {getInitials(artisan.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {artisan.name}
                </h3>
                <Badge variant="secondary" className="mt-1">
                  {artisan.skill}
                </Badge>
              </div>
              
              {artisan.rating && (
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{artisan.rating}</span>
                </div>
              )}
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{artisan.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{artisan.phone}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{artisan.experience} experience</span>
              </div>
            </div>
            
            {artisan.completedJobs && (
              <div className="mt-3">
                <span className="text-sm text-muted-foreground">
                  {artisan.completedJobs} jobs completed
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0">
        <Button asChild className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
          <Link to={`/artisan/${artisan.id}`}>
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArtisanCard;