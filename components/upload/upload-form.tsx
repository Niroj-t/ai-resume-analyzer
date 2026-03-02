"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UploadForm() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 📄 Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Allow only PDF
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setResumeFile(file);
  };

  // Click upload box
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Remove file
  const removeFile = () => {
    setResumeFile(null);
  };

  // Submit
  const handleAnalyze = async () => {
    if (!resumeFile) {
      alert("Please upload a resume PDF");
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      // future API call
      await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      console.log("Uploaded!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <form className="space-y-6">
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
                    onClick={(e) => {
                      e.stopPropagation();
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
            onChange={(e) => setJobDescription(e.target.value)}
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
  );
}