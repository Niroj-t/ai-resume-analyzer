export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parsePdfToText } from "@/lib/pdf";
import { runAiAnalysis } from "@/lib/analysis";
import type { AnalysisResult } from "@/lib/types";

export async function POST(req: Request) {
  try {
    /* ---------------------------------- */
    /* Read Form Data */
    /* ---------------------------------- */

    const formData = await req.formData();

    const file = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: "Missing resume or job description" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    /* ---------------------------------- */
    /* Convert PDF → Text */
    /* ---------------------------------- */

    const resumeArrayBuffer = await file.arrayBuffer();

    // Node runtime required for Buffer
    const resumeText = await parsePdfToText(
      Buffer.from(resumeArrayBuffer)
    );

    if (!resumeText) {
      return NextResponse.json(
        { error: "Failed to extract text from PDF" },
        { status: 400 }
      );
    }

    /* ---------------------------------- */
    /* Run AI Analysis */
    /* ---------------------------------- */

    let analysisResult: AnalysisResult;

    try {
      analysisResult = await runAiAnalysis({
        resumeText,
        jobDescription,
      });
    } catch (aiError) {
      console.error("AI analysis failed:", aiError);

      return NextResponse.json(
        { error: "AI analysis failed. Please try again." },
        { status: 500 }
      );
    }

    /* ---------------------------------- */
    /* Save to Database */
    /* ---------------------------------- */

    let analysisId: string;

    try {
      const resume = await db.resume.create({
        data: {
          text: resumeText,
          title: file.name,
          filename: file.name,
        },
      });

      const job = await db.jobDescription.create({
        data: {
          text: jobDescription,
          title: `Job for ${file.name ?? "Resume"}`,
        },
      });

      const analysis = await db.analysis.create({
        data: {
          resumeId: resume.id,
          jobDescriptionId: job.id,
          matchScore: analysisResult.matchScore,
          label: analysisResult.matchLabel,
          resultJson: analysisResult, // Prisma Json column
        },
      });

      analysisId = analysis.id;
    } catch (dbError) {
      console.error("Database error:", dbError);

      return NextResponse.json(
        { error: "Failed to save analysis" },
        { status: 500 }
      );
    }

    /* ---------------------------------- */
    /* Success Response */
    /* ---------------------------------- */

    return NextResponse.json({
      analysisId,
      data: analysisResult,
    });
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}