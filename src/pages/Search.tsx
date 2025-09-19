import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "@/components/search/SearchBar";
import ArtisanCard from "@/components/artisan/ArtisanCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get initial search params
  const initialSkill = searchParams.get("skill") || "";
  const initialLocation = searchParams.get("location") || "";

  useEffect(() => {
    fetchArtisans();
  }, []);

  useEffect(() => {
    filterArtisans(initialSkill, initialLocation);
  }, [artisans, initialSkill, initialLocation]);

  const fetchArtisans = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/artisans");
      if (!response.ok) {
        throw new Error("Failed to fetch artisans");
      }
      const data = await response.json();
      setArtisans(data);
    } catch (err) {
      setError("Failed to load artisans. Please try again later.");
      console.error("Error fetching artisans:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterArtisans = (skill: string, location: string) => {
    let filtered = artisans;

    if (skill && skill !== "All Skills") {
      filtered = filtered.filter((artisan) =>
        artisan.skill.toLowerCase().includes(skill.toLowerCase())
      );
    }

    if (location && location !== "All Locations") {
      filtered = filtered.filter((artisan) =>
        artisan.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredArtisans(filtered);
  };

  const handleSearch = (skill: string, location: string) => {
    const params = new URLSearchParams();
    if (skill && skill !== "All Skills") params.set("skill", skill);
    if (location && location !== "All Locations") params.set("location", location);
    
    setSearchParams(params);
    filterArtisans(skill, location);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg text-muted-foreground">Loading artisans...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg text-destructive mb-4">{error}</p>
          <Button onClick={fetchArtisans}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Find Artisans</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mb-6">
        <p className="text-lg text-muted-foreground">
          {filteredArtisans.length} artisan{filteredArtisans.length !== 1 ? "s" : ""} found
          {(initialSkill || initialLocation) && (
            <span>
              {" "}for{" "}
              {[initialSkill, initialLocation].filter(Boolean).join(" in ")}
            </span>
          )}
        </p>
      </div>

      {filteredArtisans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            No artisans found matching your criteria.
          </p>
          <Button variant="outline" onClick={() => handleSearch("", "")}>
            Show All Artisans
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArtisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;