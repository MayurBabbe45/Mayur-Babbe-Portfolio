import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Initialize the Express router
const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize the secure server-side Gemini Client with custom telemetry headers
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Features will operate in fallback mode.");
}

// 1. API: Portfolio calibration and smart pitch generator
app.post("/api/calibrate-prompt", async (req, res) => {
  const { recruiterGoal, companyName, interviewType, tone, customDetails } = req.body;

  if (!ai) {
    return res.status(200).json({
      success: false,
      message: "AI services are temporarily unavailable (Missing API Key configuration in secrets).",
      prompt: "PROMPT_CALIBRATION_ERROR: Secure LLM module offline.",
      pitch: `Hello! Mayur here. It looks like the Gemini API Key isn't configured in this workspace's secrets yet, but I'm fully prepared to discuss opportunities with **${companyName || "your company"}** as a **MERN & AI Developer**. Here is my direct professional profile: Mayur Babbe, Oracle Certified Generative AI Professional, SPPU IT 2025 Grad (8.48 CGPA), with 160+ C++ LeetCode DSA solutions. Let's connect!`,
      metrics: { alignment: 90, matchingSkills: ["MERN Stack", "Express.js", "Generative AI", "C++ DSA"] }
    });
  }

  // Define Mayur Babbe's technical profile data for contextual grounding
  const mayurProfileContext = `
Candidates Profile: Mayur Babbe
Core Specialty: Full Stack MERN (MongoDB, Express, React, Node.js) Developer.
Academic Credentials: 2025 Information Technology Graduate from Sinhgad Institute of Technology and Science, Pune (Savitribai Phule Pune University / SPPU) with an 8.48 CGPA.
Certification: Oracle Certified Generative AI Professional (2025).
Competitive Programming: 160+ C++ LeetCode DSA Solutions (Active solver Covering Arrays, Dynamic Programming, Sliding Window, and Two Pointers).
Work History:
- Full Stack Developer Intern at Athams (Feb 2026 – May 2026): Developed responsive UI components and integrated RESTful APIs using React.js, Node.js, and Express.js for live MERN projects. Enhanced platform health through debugging, UI/UX feature improvements, and database integration.
- Freelance Frontend Developer for ScruzeMoney.com Client Project (Sep 2025 – Oct 2025): Built a responsive landing page using React.js and DaisyUI for a forex trading mentor platform. Designed custom testimonials, hero banners, and contact forms. Optimized responsiveness and deployed domain/hosting configurations.
- Full Stack Developer Intern at DevTown (Feb 2023 – May 2023): Worked on live MERN stack projects across frontend, backend, and API integration workflows. Collaborated across SDLC and enhanced functionality through database integration.
Core Projects:
1. StreamHub – Corporate Training & Secure Media Feed (2026) [React, Node.js, Express, MongoDB, Socket.io]: Engineered a secure B2B media platform isolating corporate catalogs with access-request gates, real-time chat via Socket.io, and automated 10-day data retention rules utilizing MongoDB TTL indexes. Developed a real-time compliance metrics dashboard with watch-time auditing and custom CSV report exports. Configured cross-domain hosting with strict CORS and HTTP-only cookie signatures.
2. LedgerVault – Full-Stack Banking System (2026) [React, Node.js, MongoDB]: Built a banking system using an immutable double-entry ledger with transaction history as the source of truth. Implemented ACID-compliant P2P transfers using MongoDB Sessions/transactions, secured with HTTP-only JWT cookies and UUIDv4 idempotency keys, and decoupled email notifications with Nodemailer and OAuth2.
  `;

  const prompt = `
Mayur Babbe Profile context:
${mayurProfileContext}

Based on the recruiter's specifications:
- **Goal**: ${recruiterGoal} (e.g., Schedule an Interview, Propose a Freelance Gig, Technical Challenge)
- **Target Company**: ${companyName || "Tech Innovator"}
- **Assessment Style/Interview Domain**: ${interviewType}
- **Communication Tone**: ${tone}
- **Custom Specifications**: ${customDetails || "None provided"}

Synthesize and return a JSON structure exactly mapping the matching metrics and targeted content.
Provide:
1. **optimizedPrompt**: An engineered system prompt that the recruiter can paste into any Chat LLM to evaluate, conduct a mock interview with, or challenge Mayur for this specific role. The prompt should set a clear persona, ground the LLM in Mayur's portfolio, and suggest custom high-fidelity assessment questions.
2. **tailoredPitch**: A custom, narrative-driven personal pitch letter from Mayur addressed to ${companyName || "your team"}, written in an authoritative, minimalist tech-zen style. Emphasize why Mayur fits this exact need based on his MERN & Generative AI specialty, Oracle certification, and academic milestones.
3. **alignmentScore**: An integer between 1 and 100 capturing how aligned Mayur's technical stack is with their objectives. Let's make it realistic but highly positive (say 85-98%).
4. **matchingPoints**: An array of 3-4 specific technical synergy bullets mapping Mayur's projects/skills to their targets.

Return your response in strict JSON format. Ensure no markdown formatting wrapping the JSON, just the raw JSON object.
JSON Schema structure:
{
  "optimizedPrompt": "...",
  "tailoredPitch": "...",
  "alignmentScore": 95,
  "matchingPoints": ["...", "..."]
}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      }
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText.trim());

    res.json({
      success: true,
      ...data
    });
  } catch (error: any) {
    console.error("Gemini context aggregation failed:", error);
    res.status(500).json({
      success: false,
      error: "Failed to optimize recruiter profile.",
      prompt: "PROMPT_OPTIMIZER_TIMEOUT: Check network socket connection.",
      pitch: `Hello! It seems the LLM synthesis timed out, but Mayur's engineering profile remains completely accessible. As a MERN stack developer and Oracle Certified Generative AI Professional with 160+ C++ solutions, I am ready to deploy highly reliable full-stack applications. Let's construct something together.`,
      alignmentScore: 85,
      matchingPoints: ["MERN architecture with Node/Express background", "Oracle Certified Generative AI workspace configurations"]
    });
  }
});

// Configure Vite middleware in development or express static directories in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mayur's Portfolio dev server running on http://localhost:${PORT}`);
  });
}

startServer();
