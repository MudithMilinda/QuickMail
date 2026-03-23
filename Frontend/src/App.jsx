import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import EmailPage from "./Pages/Email";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/email" element={<EmailPage />} />
      </Routes>
      <Footer />
    </>
  );
}