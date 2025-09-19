import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Users } from "lucide-react";

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
}

const Admin = () => {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingArtisan, setEditingArtisan] = useState<Artisan | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    skill: "",
    location: "",
    phone: "",
    experience: "",
    description: "",
  });

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/artisans");
      if (!response.ok) throw new Error("Failed to fetch artisans");
      const data = await response.json();
      setArtisans(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch artisans",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const artisanData = {
      ...formData,
      rating: 4.5,
      completedJobs: Math.floor(Math.random() * 200) + 10,
    };

    try {
      const url = editingArtisan 
        ? `http://localhost:5000/artisans/${editingArtisan.id}`
        : "http://localhost:5000/artisans";
      
      const method = editingArtisan ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingArtisan ? { ...artisanData, id: editingArtisan.id } : artisanData),
      });

      if (!response.ok) throw new Error("Failed to save artisan");

      toast({
        title: "Success",
        description: `Artisan ${editingArtisan ? "updated" : "added"} successfully`,
      });

      fetchArtisans();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save artisan",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this artisan?")) return;

    try {
      const response = await fetch(`http://localhost:5000/artisans/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete artisan");

      toast({
        title: "Success",
        description: "Artisan deleted successfully",
      });

      fetchArtisans();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete artisan",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      skill: "",
      location: "",
      phone: "",
      experience: "",
      description: "",
    });
    setEditingArtisan(null);
    setShowAddDialog(false);
  };

  const startEdit = (artisan: Artisan) => {
    setFormData({
      name: artisan.name,
      skill: artisan.skill,
      location: artisan.location,
      phone: artisan.phone,
      experience: artisan.experience,
      description: artisan.description || "",
    });
    setEditingArtisan(artisan);
    setShowAddDialog(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage artisans and their profiles</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowAddDialog(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Artisan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingArtisan ? "Edit Artisan" : "Add New Artisan"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skill">Skill</Label>
                <Select value={formData.skill} onValueChange={(value) => setFormData({ ...formData, skill: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Carpenter">Carpenter</SelectItem>
                    <SelectItem value="Plumber">Plumber</SelectItem>
                    <SelectItem value="Mason">Mason</SelectItem>
                    <SelectItem value="Electrician">Electrician</SelectItem>
                    <SelectItem value="Mechanic">Mechanic</SelectItem>
                    <SelectItem value="Tailor">Tailor</SelectItem>
                    <SelectItem value="Painter">Painter</SelectItem>
                    <SelectItem value="Welder">Welder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 5 years"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the artisan's skills and experience"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingArtisan ? "Update" : "Add"} Artisan
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Artisans</p>
                <p className="text-2xl font-bold">{artisans.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Artisans</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-muted-foreground">Loading artisans...</p>
          ) : artisans.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No artisans found</p>
          ) : (
            <div className="space-y-4">
              {artisans.map((artisan) => (
                <div key={artisan.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold">{artisan.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{artisan.skill}</Badge>
                          <span className="text-sm text-muted-foreground">{artisan.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {artisan.phone} • {artisan.experience} experience
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(artisan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(artisan.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;