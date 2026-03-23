import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 pt-16 pb-10 px-4 sm:px-6 md:px-20 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="18" viewBox="0 0 38 22" fill="none">
                <path
                  d="M2 11 C6 4, 12 4, 16 11 C20 18, 26 18, 30 11"
                  stroke="#6C63FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M8 11 C12 4, 18 4, 22 11 C26 18, 32 18, 36 11"
                  stroke="#1a1a2e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
              <span className="font-extrabold text-lg text-[#1a1a2e]">
                QUICKMAILs
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Smart email creation powered by AI. Effortless, effective, and tailored.
            </p>
          </motion.div>

          {/* Links generator */}
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "How it works", "Templates"],
            },
            {
              title: "Company",
              links: ["About Us", "Blog", "Careers", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
            },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">
                {section.title}
              </h4>

              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-purple-600 transition text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
            © 2026 QuickMail. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-2xl">
            <a href="#" title="Twitter" className="text-gray-600 hover:text-purple-600 transition">
              𝕏
            </a>
            <a href="#" title="Facebook" className="text-gray-600 hover:text-purple-600 transition">
              f
            </a>
            <a href="#" title="LinkedIn" className="text-gray-600 hover:text-purple-600 transition">
              in
            </a>
            <a href="#" title="YouTube" className="text-gray-600 hover:text-purple-600 transition">
              ▶️
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}