import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import EmailGeneratorUI from "./Components/Email";

// Mock Data
const FEATURES = [
  { icon: "📧", title: "Fast Emailss", desc: "Generate emails in seconds with AI." },
  { icon: "⚡", title: "High Converting", desc: "Optimized for engagement and clicks." },
  { icon: "🎯", title: "Tailored", desc: "Personalized content for your audience." },
  { icon: "🔒", title: "Secure", desc: "Your data stays safe and private." },
];

const HOW_STEPS = [
  { step: 1, title: "Input Your Idea", desc: "Provide a brief of what you want to write." },
  { step: 2, title: "Generate Email", desc: "AI crafts a high-converting email for you." },
  { step: 3, title: "Send & Track", desc: "Send the email and track its performance." },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // ✅ Email Page
  if (currentPage === "email") {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="pt-[80px]">
          <EmailGeneratorUI onBack={() => setCurrentPage("home")} />
        </div>
      </div>
    );
  }

  // ✅ Home Page 
  return (
    <div className="bg-gray-50 min-h-screen relative overflow-x-hidden">
      
      {/* NAVBAR */}
      <Navbar />

      {/* Content */}
      <div className="pt-[80px]">

        {/* HERO */}
        <section className="relative text-center pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-purple-100 to-white -z-10"></div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            <span className="text-purple-600">Smart Email</span> Creation
            <br />
            Powered by Fast AI
            <sup className="text-xs align-super">✦</sup>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
          >
            Create high-converting emails in seconds using AI — effortless, effective, and tailored to your audience's needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex justify-center"
          >
            <button 
              onClick={() => setCurrentPage("email")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Get Started Now
            </button>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="bg-white py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold">
                Why teams love Quickmail
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                Built for marketers, founders, and teams who need emails that convert.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 text-center shadow"
                >
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 px-6 md:px-20 bg-purple-50">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Three steps to your perfect email
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow"
              >
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  {i + 1}
                </div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
}