import { useState } from "react";

export default function EmailGeneratorUI({ onBack }) {
  const [form, setForm] = useState({
    tone: "Professional",
    campaign: "Promotional",
    words: "100",
    paragraphs: "2",
    emojis: false,
    personalization: true,
    audience: [],
  });

  const audiences = [
    "Subscribers",
    "Customers",
    "Internal Email",
    "Leads",
    "Investors",
    "Partners",
    "Candidates",
  ];

  const toggleAudience = (item) => {
    setForm((prev) => ({
      ...prev,
      audience: prev.audience.includes(item)
        ? prev.audience.filter((a) => a !== item)
        : [...prev.audience, item],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 sm:p-10">

        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition"
          >
            ← Back
          </button>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          What is this email about?
        </h1>

        {/* Textarea */}
        <div className="relative mb-6">
          <textarea
            placeholder="Give us more context about your email campaign..."
            className="w-full h-40 p-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
          <span className="absolute bottom-3 right-4 text-xs text-gray-400">
            Minimum 30 characters
          </span>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          {/* Dropdown */}
          {[
            { label: "Pick a tone", key: "tone", options: ["Professional", "Casual"] },
            { label: "Campaign type", key: "campaign", options: ["Promotional", "Newsletter"] },
            { label: "Word count limit", key: "words", options: ["100", "200", "300"] },
            { label: "Paragraph count", key: "paragraphs", options: ["1", "2", "3"] },
          ].map((item) => (
            <div key={item.key}>
              <p className="text-sm text-gray-600 mb-1">{item.label}</p>
              <select
                value={form[item.key]}
                onChange={(e) =>
                  setForm({ ...form, [item.key]: e.target.value })
                }
                className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-purple-500"
              >
                {item.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-8 mb-6">
          
          {/* Emojis */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.emojis}
              onChange={() =>
                setForm({ ...form, emojis: !form.emojis })
              }
              className="accent-purple-600"
            />
            <span className="text-sm text-gray-700">Use emojis</span>
          </label>

          {/* Personalization */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.personalization}
              onChange={() =>
                setForm({
                  ...form,
                  personalization: !form.personalization,
                })
              }
              className="accent-purple-600"
            />
            <span className="text-sm text-gray-700">
              Use personalization
            </span>
          </label>
        </div>

        {/* Audience */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">
            Audience for this email
          </p>
          <div className="flex flex-wrap gap-3">
            {audiences.map((item) => (
              <button
                key={item}
                onClick={() => toggleAudience(item)}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  form.audience.includes(item)
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-gray-100 text-gray-700 hover:border-purple-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Theme + Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Theme Select */}
          <div className="w-full md:w-1/3">
            <p className="text-sm text-gray-600 mb-1">
              Try a theme (optional)
            </p>
            <select className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-purple-500">
              <option>Select a theme</option>
              <option>Modern</option>
              <option>Minimal</option>
              <option>Creative</option>
            </select>
          </div>

          {/* Button */}
          <button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
            ✨ Generate emails
          </button>
        </div>
      </div>
    </div>
  );
}