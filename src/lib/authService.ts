import api from "./api";

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export const registerUser = async (user: User) => {
  const res = await api.post("/users/register", user);
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/users/login", { email, password });
  return res.data; // contains token + user
};
