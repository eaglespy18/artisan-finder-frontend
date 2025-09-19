import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (skill: string, location: string) => void;
  className?: string;
}

const skills = [
  "All Skills",
  "Carpenter",
  "Plumber", 
  "Mason",
  "Electrician",
  "Mechanic",
  "Tailor",
  "Painter",
  "Welder"
];

const locations = [
  "All Locations",
  "Nairobi",
  "Mombasa", 
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi"
];

const SearchBar = ({ onSearch, className = "" }: SearchBarProps) => {
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch(skill, location);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`flex flex-col md:flex-row gap-4 p-6 bg-card rounded-lg shadow-card ${className}`}>
      <div className="flex-1">
        <Select value={skill} onValueChange={setSkill}>
          <SelectTrigger>
            <SelectValue placeholder="Select skill" />
          </SelectTrigger>
          <SelectContent>
            {skills.map((skillOption) => (
              <SelectItem key={skillOption} value={skillOption}>
                {skillOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full"
        />
      </div>
      
      <Button onClick={handleSearch} className="md:w-auto w-full">
        <Search className="h-4 w-4 mr-2" />
        Search Artisans
      </Button>
    </div>
  );
};

export default SearchBar;