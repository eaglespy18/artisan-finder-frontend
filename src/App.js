import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import SearchResults from "./components/pages/SearchResults";
import ArtisanProfile from "./components/pages/ArtisanProfile";
import Navbar from "./services/Navbar";  // ✅ corrected path

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artisan/:id" element={<ArtisanProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
