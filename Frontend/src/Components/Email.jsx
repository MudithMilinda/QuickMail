import { useState, useRef } from "react";

const API_URL = "http://localhost:5000/generate-email";

export default function EmailGeneratorUI({ onBack }) {
  const [summary, setSummary] = useState("");
  const [theme, setTheme] = useState("");
  const [form, setForm] = useState({
    tone: "Professional",
    words: "100",
    paragraphs: "2",
    emojis: false,
    personalization: true,
    audience: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");
  const resultRef = useRef(null);

  const audiences = [
    "Subscribers", "Customers", "Internal Email",
    "Leads", "Investors", "Partners", "Candidates",
  ];

  const toggleAudience = (item) => {
    setForm((prev) => ({
      ...prev,
      audience: prev.audience.includes(item)
        ? prev.audience.filter((a) => a !== item)
        : [...prev.audience, item],
    }));
  };

  const handleGenerate = async () => {
    setError(null);

    if (summary.trim().length < 30) {
      setError("Please enter at least 30 characters in the description.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary,
          tone: form.tone,
          campaignType: form.campaign,
          wordCountLimit: parseInt(form.words),
          paragraphCount: parseInt(form.paragraphs),
          useEmojis: form.emojis,
          usePersonalization: form.personalization,
          audience: form.audience.join(", ") || "General",
          theme: theme || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate email.");

      setResult(data.email);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start px-4 py-10">
      {/* ── Form Card ── */}
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
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Give us more context about your email campaign..."
            className="w-full h-40 p-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
          <span
            className={`absolute bottom-3 right-4 text-xs transition-colors ${
              summary.length >= 30 ? "text-green-500 font-medium" : "text-gray-400"
            }`}
          >
            {summary.length < 30
              ? `Minimum 30 characters (${30 - summary.length} remaining)`
              : `✓ ${summary.length} characters`}
          </span>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Pick a tone", key: "tone",
              options: ["Professional", "Casual", "Friendly", "Formal", "Persuasive"],
            },
            {
              label: "Word count limit", key: "words",
              options: ["50", "100", "150", "200", "300"],
            },
            {
              label: "Paragraph count", key: "paragraphs",
              options: ["1", "2", "3", "4"],
            },
          ].map((item) => (
            <div key={item.key}>
              <p className="text-sm text-gray-600 mb-1">{item.label}</p>
              <select
                value={form[item.key]}
                onChange={(e) => setForm({ ...form, [item.key]: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                {item.options.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-8 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.emojis}
              onChange={() => setForm({ ...form, emojis: !form.emojis })}
              className="accent-purple-600"
            />
            <span className="text-sm text-gray-700">Use emojis</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.personalization}
              onChange={() => setForm({ ...form, personalization: !form.personalization })}
              className="accent-purple-600"
            />
            <span className="text-sm text-gray-700">Use personalization</span>
          </label>
        </div>

        {/* Audience */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">Audience for this email</p>
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
          <div className="w-full md:w-1/3">
            <p className="text-sm text-gray-600 mb-1">Try a theme (optional)</p>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Select a theme</option>
              <option>Modern</option>
              <option>Minimal</option>
              <option>Creative</option>
              <option>Bold</option>
              <option>Elegant</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Generating...
              </>
            ) : (
              "✨ Generate emails"
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* ── Result Card ── */}
      {result && (
        <div
          ref={resultRef}
          className="w-full max-w-6xl mt-8 bg-white rounded-2xl shadow-md p-6 sm:p-10 border-t-4 border-purple-500"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">✉️ Generated Email</h2>
            <button
              onClick={() => setResult(null)}
              className="text-sm text-gray-400 hover:text-gray-600 transition"
            >
              ✕ Clear
            </button>
          </div>

          {/* Subject Line */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Subject Line
            </p>
            <div className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 gap-4">
              <p className="text-sm font-semibold text-purple-800 flex-1">{result.subject}</p>
              <button
                onClick={() => handleCopy(result.subject, "subject")}
                className="text-xs shrink-0 bg-white border border-purple-200 text-purple-500 hover:bg-purple-600 hover:text-white px-3 py-1.5 rounded-lg transition"
              >
                {copied === "subject" ? "✓ Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Email Body */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Email Body
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {result.body}
              </p>
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <button
                  onClick={() => handleCopy(`Subject: ${result.subject}\n\n${result.body}`, "full")}
                  className="text-xs bg-white border border-gray-200 text-gray-500 hover:border-purple-400 hover:text-purple-600 px-4 py-1.5 rounded-lg transition"
                >
                  {copied === "full" ? "✓ Copied!" : "📋 Copy full email"}
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? "Regenerating..." : "🔄 Regenerate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}