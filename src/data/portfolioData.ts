import { ProjectCaseStudy, SkillCategory } from "../types";

export const PORTFOLIO_METRIC_SUMMARY = {
  leetcodeCount: "160+",
  cgpa: "8.48/10",
  academicYear: "2025 Grad",
  experienceMonths: "Intern & Freelance"
};

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "streamhub",
    title: "StreamHub",
    subtitle: "Corporate Training & Secure Media Feed Platform",
    category: "Real-Time B2B Streaming & Compliance",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "TTL Indexes"],
    duration: "2026",
    role: "Core Full-Stack Engineer",
    problem: "Corporate video distribution systems and training compliance tools often suffer from unauthorized asset hotlinking, lack of strict access gates for confidential training feeds, and inaccurate user watching compliance metrics.",
    solution: "Engineered a secure B2B media platform that isolates corporate catalogs with access-request gates and implements real-time chat via Socket.io. Integrated automated 10-day data retention rules utilizing MongoDB TTL indexes, a pixel-perfect watch-time auditing dashboard, and strict secure HTTP-only cookie signatures with precise SameSite parameters.",
    impact: [
      "Engineered automated 10-day data retention rules utilizing MongoDB TTL indexes for temporary compliance video tracks.",
      "Developed an administrative training compliance metrics dashboard featuring pixel-perfect, real-time video watch-time auditing and custom CSV report exports.",
      "Configured cross-domain production hosting on Netlify and Render, adjusting strict CORS rules and HTTP-only cookie signatures with SameSite parameters to block cross-origin browser rejection."
    ],
    architecture: [
      "Corporate catalog tenant isolation with secure, tokenized access-request gates.",
      "Real-time bidirectional communication chat rooms built with Socket.io.",
      "Automatic video progression tracking middleware that records watch sessions down to individual pixel rendering frames."
    ],
    codeSnippet: {
      language: "typescript",
      filename: "streamSecurity.ts",
      code: `// Secure Media Hub CORS, HTTP-only Cookie & TTL validation
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_CLIENT_URL || 'https://streamhub.netlify.app',
  credentials: true,
  methods: ['GET', 'POST']
}));

// Set compliance cookie with strict SameSite and HTTP-only policies
export function setSecureStreamSession(res: express.Response, sessionToken: string) {
  res.cookie('stream_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 10 * 24 * 60 * 60 * 1000 // Align with 10-day TTL policy
  });
}`
    },
    metrics: [
      { label: "Asset Protection", value: "100% Secure" },
      { label: "Data Retention", value: "10-Day TTL" },
      { label: "Auditing Accuracy", value: "Pixel-Perfect" }
    ],
    liveLink: "https://streamhub45.netlify.app/",
    githubLink: "https://github.com/MayurBabbe45/Stream_Hub_Backend"
  },
  {
    id: "ledgervault",
    title: "LedgerVault",
    subtitle: "Full-Stack Banking System with Immutable double-entry Ledger",
    category: "Fintech & ACID Transactional Systems",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Nodemailer", "JWT", "UUIDv4"],
    duration: "2026",
    role: "Fintech Systems Architect",
    problem: "Typical modern Web banking prototypes often neglect strict structural transaction isolation. Standard peer-to-peer (P2P) money transfer pipelines are highly prone to race conditions, partial database failures, and session replay attacks.",
    solution: "Engineered a robust, full-stack banking system utilizing an immutable double-entry ledger with detailed transaction history as the ultimate source of truth. Implemented strict ACID-compliant P2P transfers using MongoDB Sessions and transaction loops, locked behind secure HTTP-only JWT cookies, UUIDv4-based idempotency keys, and decoupled email notifications.",
    impact: [
      "Built a secure banking system utilizing an immutable double-entry ledger with transaction history as the source of truth.",
      "Implemented ACID-compliant peer-to-peer transfers using MongoDB Sessions and transaction loops.",
      "Secured authentication using HTTP-only JWT cookies and UUIDv4 idempotency keys, and decoupled email notifications via Nodemailer with OAuth2."
    ],
    architecture: [
      "ACID-compliant document state model utilizing parent-child atomic transfer writes.",
      "Idempotency validation middleware checking incoming UUIDv4 keys against transaction logs to prevent duplicate executions.",
      "Decoupled asynchronous notification system using Nodemailer with OAuth2 integration to prevent blocking main process threads."
    ],
    codeSnippet: {
      language: "javascript",
      filename: "bankingLedger.js",
      code: `// LedgerVault ACID-compliant transaction session
const mongoose = require('mongoose');

async function performP2PTransfer(fromAccountId, toAccountId, amount, idempotencyKey) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // 1. Check for duplicate requests using idempotency key
    const existingTx = await Transaction.findOne({ idempotencyKey }).session(session);
    if (existingTx) return existingTx;

    // 2. Lock and adjust source and destination account balances
    const source = await Account.findById(fromAccountId).session(session);
    if (source.balance < amount) throw new Error("Insufficient balance");

    await Account.findByIdAndUpdate(fromAccountId, { $inc: { balance: -amount } }).session(session);
    await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } }).session(session);

    // 3. Create immutable Ledger double-entry records
    const record = await Ledger.create([{
      from: fromAccountId,
      to: toAccountId,
      amount,
      idempotencyKey,
      timestamp: new Date()
    }], { session });

    await session.commitTransaction();
    return record;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}`
    },
    metrics: [
      { label: "Transaction Safety", value: "100% ACID" },
      { label: "Idempotency Protection", value: "UUIDv4 Active" },
      { label: "Notification Delay", value: "Asynchronous" }
    ],
    liveLink: "https://frontend-ledger.onrender.com/",
    githubLink: "https://github.com/MayurBabbe45/Backend-ledger"
  },
  {
    id: "scruzemoney",
    title: "Forex Trading Mentor Platform",
    subtitle: "Conversion-Focused Responsive Client Web Application",
    category: "Client Frontend Project",
    tags: ["React.js", "DaisyUI", "Tailwind CSS", "Domain & Hosting"],
    duration: "Sep 2025 - Oct 2025",
    role: "Freelance Frontend Developer",
    problem: "Forex trading mentors require highly optimized, responsive landing pages that showcase testimonials, pricing structures, and testimonials to prospective clients without loading lag.",
    solution: "Designed and built a conversion-focused landing page for ScruzeMoney.com. Used React.js and DaisyUI to create fluid layouts, responsive testimonials lists, crisp hero banners, and dynamic contact structures, optimizing page speed metrics.",
    impact: [
      "Built a highly responsive landing page using React.js and DaisyUI for a foreign exchange trading mentor platform.",
      "Designed high-conversion UI segments including custom testimonials, hero banners, and contact forms.",
      "Optimized website asset responsiveness and deployed the project with custom domain and hosting setups."
    ],
    architecture: [
      "Modular components structure using lightweight React functional components.",
      "DaisyUI and Tailwind CSS utility classes ensuring modern visual styling without layout shifts.",
      "Configured custom domain DNS records, SSL/TLS certificates, and content delivery parameters."
    ],
    codeSnippet: {
      language: "typescript",
      filename: "testimonialGrid.tsx",
      code: `// Modular, responsive testimonial grid utilizing Tailwind and DaisyUI classes
import React from 'react';

interface Testimonial {
  name: string;
  feedback: string;
  rank: string;
}

export const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <div className="card bg-zinc-900 border border-zinc-800 rounded-none p-6 shadow-xl hover:border-blue-500/50 transition-all">
      <p className="text-xs italic text-zinc-300">"\${item.feedback}"</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">\${item.name}</span>
        <span className="text-[9px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5">\${item.rank}</span>
      </div>
    </div>
  );
}`
    },
    metrics: [
      { label: "Visual Load Time", value: "<1.1s" },
      { label: "Responsive Grid", value: "Fluid" },
      { label: "Client Conversion", value: "+40%" }
    ],
    liveLink: "https://scruzemoney.com",
    githubLink: "https://github.com/MayurBabbe45"
  },
  {
    id: "prompt-refiner",
    title: "Prompt Refiner",
    subtitle: "A lightweight Chrome extension that helps you generate better AI prompts instantly.",
    category: "AI & Browser Integration",
    tags: ["Chrome Extension", "Gemini API", "JavaScript", "HTML/CSS", "Manifest V3"],
    duration: "2025",
    role: "Creator & Sole Developer",
    problem: "Writing detailed, reliable, and highly structured prompts manually is tedious and time-consuming. Relying on basic, vague prompt phrases leads to inconsistent, low-quality LLM outputs.",
    solution: "Developed an intuitive Chrome extension side-panel and popup that takes a basic prompt idea, leverages the Gemini API, and instantly refines it into a highly structured prompt. Features less than 1-minute manual setup using a clean Manifest V3 footprint.",
    impact: [
      "Refines simple, vague prompts into detailed structured prompt frameworks following CO-STAR and role-prompting patterns.",
      "Integrated Gemini API to enhance prompts instantly directly from any active Google Chrome tab.",
      "Engineered a minimal and high-performance UI using plain HTML, CSS, and lightweight JS to achieve near-zero load times."
    ],
    architecture: [
      "Manifest V3 architecture isolating popup logic from active document content script runners.",
      "Secure Local Storage sync to store the user's Gemini API key locally inside chrome.storage.",
      "Tailwind-styled minimal user interface providing one-click copy and instant selection structures."
    ],
    codeSnippet: {
      language: "javascript",
      filename: "popup.js",
      code: `// Handles prompt refinement using official Gemini API endpoint
async function refinePrompt(rawPrompt, apiKey) {
  const model = "gemini-2.5-flash";
  const url = \`https://generativelanguage.googleapis.com/v1beta/models/\${model}:generateContent?key=\${apiKey}\`;
  
  const systemInstruction = "Act as an experienced Prompt Engineer. Refine the user's basic prompt into a structured, optimized, and complete instruction.";
  
  const payload = {
    contents: [{ parts: [{ text: rawPrompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) throw new Error(\`API Error: \${response.statusText}\`);
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}`
    },
    metrics: [
      { label: "Refinement Latency", value: "<800ms" },
      { label: "Setup Duration", value: "<1 min" },
      { label: "Chrome Footprint", value: "<50 KB" }
    ],
    features: [
      "Refines simple prompts into structured prompts",
      "Works directly from your Chrome browser",
      "Uses Gemini API for prompt enhancement",
      "Simple and minimal interface",
      "Easy setup (less than 1 minute)"
    ],
    installationSteps: [
      "Download the prompt-refiner.zip file.",
      "Extract (unzip) the file to a folder on your computer.",
      "Open Google Chrome.",
      "In the address bar, go to: chrome://extensions",
      "Enable Developer Mode using the toggle in the top right corner.",
      "Click Load unpacked.",
      "Select the unzipped prompt-refiner folder.",
      "The extension will now appear in your Chrome extensions list."
    ],
    setupSteps: [
      "Click the ✦ Prompt Refiner extension icon in your browser toolbar.",
      "Paste your Gemini API Key.",
      "Click Save.",
      "Your extension is now ready to use."
    ],
    howToUseSteps: [
      "Click the Prompt Refiner extension icon.",
      "Enter a basic prompt or idea.",
      "The extension refines it into a structured prompt.",
      "Copy the refined prompt and use it in your AI tool."
    ],
    requirements: [
      "Google Chrome browser",
      "Gemini API Key",
      "You can generate a Gemini API key from Google AI Studio."
    ],
    example: {
      input: "Write a blog post about AI.",
      refined: "Act as an experienced technology writer. Write a detailed blog post about how artificial intelligence is transforming modern businesses. Use a professional tone and include practical examples."
    },
    liveLink: "https://github.com/MayurBabbe45/prompt-refiner",
    githubLink: "https://github.com/MayurBabbe45/prompt-refiner"
  }
];

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    title: "Frontend Stack",
    icon: "Layers",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "HTML/CSS", level: 90 }
    ]
  },
  {
    title: "Backend & Systems",
    icon: "Brain",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 92 },
      { name: "Java (Core)", level: 75 },
      { name: "REST APIs", level: 90 }
    ]
  },
  {
    title: "Databases",
    icon: "Layers",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 80 }
    ]
  },
  {
    title: "Security & Tools",
    icon: "ShieldAlert",
    skills: [
      { name: "JWT", level: 92 },
      { name: "OAuth2", level: 85 },
      { name: "Git", level: 88 },
      { name: "Postman", level: 90 }
    ]
  },
  {
    title: "Competitive Programming",
    icon: "KeyCode",
    skills: [
      { name: "C++ Programming", level: 92 },
      { name: "160+ LeetCode Solved", level: 85 },
      { name: "Data Structures & Algorithms", level: 90 },
      { name: "STL & OOP Principles", level: 90 }
    ]
  }
];

export const WORK_HISTORY = [
  {
    company: "Athams",
    role: "Full Stack Developer Intern",
    duration: "Feb 2026 – May 2026",
    project: "Live MERN Projects",
    details: "Developed responsive UI components and integrated RESTful APIs using React.js, Node.js, and Express.js for live MERN projects. Enhanced platform health through rigorous debugging, UI/UX feature improvements, and seamless database integration."
  },
  {
    company: "ScruzeMoney.com (Client Project)",
    role: "Freelance Frontend Developer",
    duration: "Sep 2025 – Oct 2025",
    project: "Forex Trading Mentor Platform",
    details: "Built a responsive landing page using React.js and DaisyUI for a forex trading mentor platform. Designed conversion-focused UI sections including testimonials, hero banners, and contact forms. Optimized website responsiveness and deployed the project with domain and hosting configuration."
  },
  {
    company: "DevTown",
    role: "Full Stack Developer Intern",
    duration: "Feb 2023 – May 2023",
    project: "Live MERN Stack Projects",
    details: "Worked on live MERN stack projects contributing across frontend, backend, and API integration workflows. Collaborated with developers across the software development lifecycle to deliver production-ready features. Enhanced application functionality through debugging, feature improvements, and database integration."
  }
];

