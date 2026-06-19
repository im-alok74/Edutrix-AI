import { GoogleGenerativeAI } from "@google/generative-ai";
import type { StudentProfile } from "@/types/domain";

const systemPrompt = `You are Nova, EduTrix's warm, precise AI study assistant.
Help Indian students preparing for GATE, JEE, NEET, CUET, and school exams.
Prefer concise explanations, exam strategy, step-by-step reasoning, and revision prompts.
Never fabricate exam facts. Ask a clarifying question when the student's doubt lacks context.`;

export async function askNova(input: {
  message: string;
  profile?: StudentProfile;
  history?: { role: "user" | "assistant"; content: string }[];
}) {
  if (!process.env.GEMINI_API_KEY) {
    return "Nova is ready, but GEMINI_API_KEY is not configured. Once connected, I will solve doubts, generate notes, and adapt plans using your Aura profile.";
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
  const context = input.profile
    ? `Student profile: exam=${input.profile.exam}, weak=${input.profile.weakSubjects.join(", ")}, strong=${input.profile.strongSubjects.join(", ")}, style=${input.profile.learningStyle}.`
    : "Student profile is not complete yet.";

  const result = await model.generateContent([
    systemPrompt,
    context,
    ...(input.history ?? []).map((turn) => `${turn.role}: ${turn.content}`),
    `user: ${input.message}`
  ]);

  return result.response.text();
}
