import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">AF</span>
            </div>
            <span className="text-xl font-bold text-foreground">Artisan Finder</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                isActive("/search") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                isActive("/admin") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Settings className="h-4 w-4" />
              Admin
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;