import api from "./api";

export interface Artisan {
  id?: number;
  name: string;
  skill: string;
  location: string;
  phone: string;
}

// Get all artisans
export const getArtisans = async (): Promise<Artisan[]> => {
  const res = await api.get("/artisans");
  return res.data;
};

// Add new artisan (needs token)
export const addArtisan = async (artisan: Artisan, token: string) => {
  const res = await api.post("/artisans", artisan, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
