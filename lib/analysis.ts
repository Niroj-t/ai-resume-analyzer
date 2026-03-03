import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalysisResult } from "./types";

type RunAiAnalysisInput = {
  resumeText: string;
  jobDescription: string;
};

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);
const modelName =
  process.env.GEMINI_MODEL ?? "gemini-3-flash-preview";

export async function runAiAnalysis(
  input: RunAiAnalysisInput,
): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.3, 
      topP: 0.9,
    },
  });

  const prompt = `
You are an expert career coach and ATS optimization specialist.

Given a resume and a job description, evaluate match quality,
identify strengths and weaknesses, check ATS friendliness,
and generate concrete improvements.

You MUST return JSON matching this TypeScript type EXACTLY:

type AnalysisResult = {
  matchScore: number;
  matchLabel: "Poor" | "Fair" | "Good" | "Excellent";
  summary: string;
  strengths: string[];
  weaknesses: string[];
  matchedKeywords: string[];
  missingSkills: string[];
  sectionScores: {
    overallStructure: number;
    summary: number;
    experience: number;
    skills: number;
    projects: number;
    formatting: number;
  };
  improvementSuggestions: string[];
  atsChecks: {
    overallScore: number;
    atsFriendly: boolean;
    issues: {
      type: "format" | "keywords" | "sections" | "length" | "other";
      message: string;
      severity: "low" | "medium" | "high";
    }[];
  };
  tailoredBullets: {
    section: "summary" | "experience" | "projects";
    originalSnippet?: string;
    suggestions: string[];
  }[];
};

RESUME (plain text):
${input.resumeText}

JOB DESCRIPTION:
${input.jobDescription}

Return ONLY a valid JSON object.
Do NOT include markdown, explanations, or extra text.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  if (!text) {
    throw new Error("Gemini returned empty response");
  }

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let parsed: AnalysisResult;

  try {
    parsed = JSON.parse(cleaned) as AnalysisResult;
  } catch (error) {
    console.error("❌ Gemini raw response:\n", text);

    throw new Error(
      `Failed to parse Gemini JSON: ${(error as Error).message}`
    );
  }

  return parsed;
}