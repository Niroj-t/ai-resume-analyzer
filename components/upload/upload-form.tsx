"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnalysisResults } from "@/components/Result/analysis-result";
import type { AnalysisResult } from "@/lib/types";

export function UploadForm() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setResumeFile(file);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      alert("Please upload a resume PDF");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to analyze resume");
      }

      const json = (await res.json()) as {
        analysisId: string;
        data: AnalysisResult;
      };

      // keep local result (optional)
      setAnalysisResult(json.data);

      // navigate to /analysis with the id
      router.push(`/analysis?analysisId=${encodeURIComponent(json.analysisId)}`);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription("");
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {/* Resume Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">Upload Resume (PDF)</CardTitle>
          </CardHeader>

          <CardContent>
            <div
              onClick={openFilePicker}
              className="cursor-pointer border-2 border-dashed rounded-lg p-8 text-center border-blue-200 hover:border-blue-400 bg-white/80 hover:bg-blue-50 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="flex flex-col items-center gap-2">
                {resumeFile ? (
                  <>
                    <FileText className="w-12 h-12 text-blue-600" />
                    <p className="text-sm font-medium">
                      {resumeFile.name}
                    </p>

                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFile();
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-blue-400" />
                    <p className="text-sm font-medium">
                      Click to upload your resume
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF files only
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">Job Description</CardTitle>
          </CardHeader>

          <CardContent>
            <Textarea
              placeholder="Paste the job description here..."
              className="min-h-200px resize-y border-blue-200 focus-visible:ring-blue-500"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              disabled={isAnalyzing}
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <Button
          type="button"
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing Resume...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-5 w-5" />
              Analyze Resume
            </>
          )}
        </Button>
      </form>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      {analysisResult && (
        <div className="mt-6">
          <AnalysisResults data={analysisResult} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}