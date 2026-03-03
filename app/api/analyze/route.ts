// app/api/analyze/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { parsePdfToText } from "@/lib/pdf";
import { runAiAnalysis } from "@/lib/analysis";
import type { AnalysisResult } from "@/lib/types";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const formData = await req.formData();
  const file = formData.get("resume") as File | null;
  const jobDescription = formData.get("jobDescription") as string | null;

  if (!file || !jobDescription) {
    return NextResponse.json(
      { error: "Missing resume or job description" },
      { status: 400 },
    );
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Only PDF files are allowed" },
      { status: 400 },
    );
  }

  const resumeArrayBuffer = await file.arrayBuffer();
  const resumeText = await parsePdfToText(Buffer.from(resumeArrayBuffer));

  let analysisResult: AnalysisResult;
  try {
    analysisResult = await runAiAnalysis({ resumeText, jobDescription });
  } catch (error) {
    console.error("AI analysis failed:", error);
    return NextResponse.json(
      { error: "AI analysis failed. Please try again." },
      { status: 500 },
    );
  }

  const userId = (session.user as any)?.id ?? null;

  const resume = await db.resume.create({
    data: {
      userId,
      text: resumeText,
      title: file.name,
      filename: file.name,
    },
  });

  const job = await db.jobDescription.create({
    data: {
      userId,
      text: jobDescription,
      title: `Job for ${file.name ?? "Resume"}`,
    },
  });

  const analysis = await db.analysis.create({
    data: {
      userId,
      resumeId: resume.id,
      jobDescriptionId: job.id,
      matchScore: analysisResult.matchScore,
      label: analysisResult.matchLabel,
      resultJson: analysisResult,
    },
  });

  return NextResponse.json({
    analysisId: analysis.id,
    data: analysisResult,
  });
}