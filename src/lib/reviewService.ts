import api from "./api";

export interface Review {
  id?: number;
  artisanId: number;
  rating: number;
  comment: string;
}

export const getReviews = async (artisanId: number): Promise<Review[]> => {
  const res = await api.get(`/reviews/${artisanId}`);
  return res.data;
};

export const addReview = async (review: Review, token: string) => {
  const res = await api.post("/reviews", review, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
