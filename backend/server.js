const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set via environment variable
});

/**
 * POST /generate-email
 * Body:
 * {
 *   summary: string,           // "I need to take leave tomorrow"
 *   tone: string,              // "Professional" | "Casual" | "Friendly" | "Formal"
 *   campaignType: string,      // "Promotional" | "Newsletter" | "Transactional" | "Announcement"
 *   wordCountLimit: number,    // e.g. 100
 *   paragraphCount: number,    // e.g. 2
 *   useEmojis: boolean,        // true | false
 *   usePersonalization: boolean, // true | false
 *   audience: string,          // "Subscribers" | "Customers" | "Internal Email" | "Leads" | "Investors" | "Partners" | "Candidates"
 *   theme: string | null       // optional theme
 * }
 */
app.post("/generate-email", async (req, res) => {
  const {
    summary,
    tone = "Professional",
    campaignType = "Promotional",
    wordCountLimit = 100,
    paragraphCount = 2,
    useEmojis = false,
    usePersonalization = false,
    audience = "Customers",
    theme = null,
  } = req.body;

  // Validation
  if (!summary || summary.trim().length < 30) {
    return res.status(400).json({
      error: "Summary must be at least 30 characters long.",
    });
  }

  // Build the system prompt
  const systemPrompt = `You are a senior email copywriting assistant specializing in high-quality, conversion-focused emails.

You MUST strictly follow all instructions and constraints. Do NOT deviate.

Return ONLY a valid JSON object in this EXACT format:
{
  "subject": "<string>",
  "body": "<string>"
}

Do NOT include explanations, extra keys, or text outside the JSON.

--- EMAIL REQUIREMENTS ---

1. Tone: ${tone}
   - Ensure tone is consistent throughout (no mixing styles)

2. Campaign Type: ${campaignType}
   - Promotional → persuasive, benefit-driven, CTA-focused
   - Newsletter → informative, engaging, lightly conversational
   - Transactional → clear, concise, functional
   - Announcement → informative, structured, neutral-positive

3. Target Audience: ${audience}
   - Adapt vocabulary, clarity, and intent accordingly

4. Word Count:
   - HARD LIMIT: Maximum ${wordCountLimit} words
   - Prefer slightly under the limit rather than exceeding

5. Paragraph Count:
   - EXACTLY ${paragraphCount} paragraphs
   - Paragraphs must be separated by a single newline character (\n)
   - No bullet points unless absolutely necessary

6. Emojis:
   - ${useEmojis ? "Use emojis sparingly and only where appropriate (max 1–2)" : "Do NOT use emojis"}

7. Personalization:
   - ${usePersonalization 
     ? "Use placeholders like {{First Name}}, {{Company}} naturally (not overused)" 
     : "Do NOT include any placeholders"}

8. ${theme ? `Theme: Subtly incorporate "${theme}" into wording, tone, or metaphor` : "Theme: None"}

--- STYLE RULES ---

- Write like a human, not robotic
- Avoid clichés and generic phrases
- Keep sentences concise and readable
- Ensure logical flow between paragraphs
- Include a clear purpose or takeaway
- Avoid repetition

--- SUBJECT LINE RULES ---

- Keep under 10 words
- Make it relevant and compelling
- Avoid spammy phrasing (e.g., "FREE!!!", excessive caps)

--- FINAL VALIDATION CHECKLIST (MANDATORY) ---

Before responding, ensure:
- JSON is valid and parsable
- Exactly ${paragraphCount} paragraphs are present
- Word count is within limit
- Tone matches "${tone}"
- No rule violations

If any rule is violated, FIX it before responding.`;

  const userPrompt = `User-provided email context:

"${summary}"

Generate the email according to ALL system rules. Do not ignore constraints.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content;
    const parsed = JSON.parse(raw);

    return res.status(200).json({
      success: true,
      email: {
        subject: parsed.subject,
        body: parsed.body,
      },
      usage: completion.usage,
    });
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    return res.status(500).json({
      error: "Failed to generate email. Please try again.",
      details: err.message,
    });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Email Generator API running on http://localhost:${PORT}`);
});