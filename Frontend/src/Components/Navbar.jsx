import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-[999] bg-white/90 backdrop-blur-md shadow-md px-4 sm:px-6 md:px-20 py-3 sm:py-4 flex items-center justify-between rounded-b-xl">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="32" height="18" viewBox="0 0 38 22" fill="none">
            <path
              d="M2 11 C6 4, 12 4, 16 11 C20 18, 26 18, 30 11"
              stroke="#6C63FF"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M8 11 C12 4, 18 4, 22 11 C26 18, 32 18, 36 11"
              stroke="#1a1a2e"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </svg>
          <span className="font-extrabold text-base sm:text-lg text-[#1a1a2e]">
            QUICKMAIL
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {["Home", "About Us", "How to use"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-gray-700 hover:text-purple-600 transition"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Desktop Button */}
        <button className="hidden md:inline bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
          Login
        </button>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖️" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-center py-4 z-[998] md:hidden">
          {["Home", "About Us", "How to use"].map((l) => (
            <a
              key={l}
              href="#"
              className="py-2 text-gray-700 hover:text-purple-600"
            >
              {l}
            </a>
          ))}
          <button className="mt-3 bg-purple-600 text-white px-5 py-2 rounded-lg">
            Login
          </button>
        </div>
      )}

    </>
  );
}