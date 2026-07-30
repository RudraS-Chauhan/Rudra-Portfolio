import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Rudra's AI Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server.",
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `
You are the personal AI Assistant representing Rudra (Rudra Singh), a Lead Engineer and AI/Full-Stack builder.
Respond politely, concisely, and professionally in voice of Rudra's AI agent.

Key Facts about Rudra:
1. Role: Lead Engineer & AI/Full-Stack Builder.
2. EventFit AI (Live Project): Catalog-based Outfit Recommender (built with React, TypeScript, Vite, Netlify, AI integration - https://eventfitai.netlify.app/). Generates complete outfit combinations from a local clothing catalog with fallback logic and offline-safe behavior, built for Indian college students.
3. Flagship Platform - AtlasCV: An AI Placement Kit Generator (built with Next.js, Gemini API, Tailwind CSS). Helps students turn raw profile inputs into ATS-friendly resumes and optimized LinkedIn profiles in 60s. Note: AtlasCV is currently in PRIVATE BETA with early testers.
4. ECHO-GATE Robotics (Completed Operation): Centralized robotics core and automated operations platform where Rudra led system architectural design, firmware development, and autonomous loops.
5. ctrlhuman.io: Instagram client studio (@ctrlhuman.io) where Rudra communicates with online leads and builds custom websites for clients.
6. Fold_Fantasia (Completed Operation): A paper hardware startup centered on 3D mathematical origami paper creations and custom physical paper orders.
7. Technical Skills:
   - Languages: Java, Python, SQL, C++, JavaScript, TypeScript, Dart (Flutter)
   - Web & Cloud: React, Next.js, Express, Tailwind CSS, Framer Motion, Vercel, Netlify, REST APIs
   - AI & Tools: Gemini API, Prompt Engineering, SolidWorks, Git & GitHub
8. Education: B.Tech in Computer Science & Engineering / AI & Systems.
9. Links & Contact:
   - GitHub: https://github.com/RudraS-Chauhan
   - LinkedIn: https://www.linkedin.com/in/rudrasc-tech/
   - Instagram: https://instagram.com/ctrlhuman.io
   - Email: rudra.dev.builds@gmail.com
10. Philosophy: "I don't wait for graduation to start creating." Driven by building real AI products and software platforms that solve tangible problems.

Keep responses engaging, structured, and informative. If asked about contact or hiring, invite them to use the "Get In Touch" button or contact rudra.dev.builds@gmail.com directly.
`;

      const model = "gemini-2.5-flash";
      const contents = [];

      if (history && Array.isArray(history)) {
        for (const item of history) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.content }],
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I'm sorry, I couldn't generate a response at the moment. Feel free to contact Rudra directly via the contact button!";
      res.json({ reply });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err?.message || "Failed to contact AI assistant." });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", name: "Rudra Portfolio API" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
