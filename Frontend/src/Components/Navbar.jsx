import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (id) => {
    setMenuOpen(false);

    if (location.pathname === "/" || location.pathname === "/home") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[999] bg-white/90 backdrop-blur-md shadow-md sm:px-6 md:px-20  sm:py-4 flex items-center justify-between rounded-b-xl">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
        >
          <svg width="32" height="18" viewBox="0 0 38 22" fill="none">
            <path d="M2 11 C6 4, 12 4, 16 11 C20 18, 26 18, 30 11" stroke="#6C63FF" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M8 11 C12 4, 18 4, 22 11 C26 18, 32 18, 36 11" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5"/>
          </svg>
          <span className="font-extrabold text-base sm:text-lg text-[#1a1a2e]">
            QUICKMAIL
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => handleNavigation("home")} className="text-gray-700 hover:text-purple-600 transition">
            Home
          </button>
          <button onClick={() => handleNavigation("about")} className="text-gray-700 hover:text-purple-600 transition">
            About Us
          </button>
          <button onClick={() => handleNavigation("how-to-use")} className="text-gray-700 hover:text-purple-600 transition">
            How to use
          </button>
        </div>
        <button
            onClick={() => navigate("/email")}
            className="hidden md:block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm"
          >
            Get Started Now
          </button>

        {/* Mobile Toggle Button ✅ */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? "✖️" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu ✅ */}
      {menuOpen && (
        <div className="fixed top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-center py-4 z-[998] md:hidden">
          <button onClick={() => handleNavigation("home")} className="py-2 text-gray-700 hover:text-purple-600">
            Home
          </button>
          <button onClick={() => handleNavigation("about")} className="py-2 text-gray-700 hover:text-purple-600">
            About Us
          </button>
          <button onClick={() => handleNavigation("how-to-use")} className="py-2 text-gray-700 hover:text-purple-600">
            How to use
          </button>
          <button
            onClick={() => {
              navigate("/email");
              setMenuOpen(false);
            }}
            className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition text-center"
          >
            Get Started Now
          </button>
        </div>
      )}
    </>
  );
}