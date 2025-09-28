# 🎨 Artisan Finder Frontend

This is the **frontend app** for the Artisan Finder platform.  
It is built with **React + TypeScript + Vite** and connects to the backend API.

---

## ⚙️ Tech Stack
- **React (TypeScript)** → Frontend framework  
- **Vite** → Fast development & build tool  
- **Axios** → API requests  
- **React Router** → Routing & navigation  
- **Tailwind CSS + shadcn/ui** → Styling & components  

---

## 📌 Features
- Search artisans by **skill** and **location**  
- View artisan profiles & details  
- Browse all artisans in the database  
- User registration & login (planned)  
- Review system integration (planned)  

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/<your-frontend-repo>.git
cd artisan-finder-frontend
2. Install dependencies
bash
Copy code
npm install
3. Setup environment variables
Create a .env file in the root folder:

env
Copy code
VITE_API_URL=http://localhost:5000
4. Run the app
bash
Copy code
npm run dev
App will run at:
👉 http://localhost:8080

📡 API Integration
Frontend communicates with the backend via src/lib/api.ts:

ts
Copy code
// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000"
});

export default api;
Example usage in a page:

ts
Copy code
const response = await api.get("/artisans");
console.log(response.data);
✅ Next Steps
Connect user authentication to frontend

Add review posting & display

Improve UI/UX with more components

Deploy frontend to Netlify / Vercel / Render

📜 License
MIT License © 2025 Artisan Finder Project

Developer: ALHASSAN MOHAMMED KHIDIR