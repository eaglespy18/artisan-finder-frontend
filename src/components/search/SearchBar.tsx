import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  "Welder",
];

const locations = [
  "All Locations",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
];

const SearchBar = ({ onSearch, className = "" }: SearchBarProps) => {
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch(skill, location);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-4 p-6 rounded-lg shadow-card bg-card ${className}`}
    >
      {/* Skill Select */}
      <div className="flex-1">
        <Select value={skill} onValueChange={setSkill}>
          <SelectTrigger className="text-black dark:text-white">
            <SelectValue
              placeholder="Select skill"
              className="text-gray-500 dark:text-gray-400"
            />
          </SelectTrigger>
          <SelectContent>
            {skills.map((skillOption) => (
              <SelectItem
                key={skillOption}
                value={skillOption}
                className="text-black dark:text-white"
              >
                {skillOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location Input */}
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      {/* Search Button */}
      <Button onClick={handleSearch} className="md:w-auto w-full">
        <Search className="h-4 w-4 mr-2" />
        Search Artisans
      </Button>
    </div>
  );
};

export default SearchBar;
