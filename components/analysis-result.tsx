import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  TrendingUp,
  Award,
  RotateCcw,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/lib/types";

type AnalysisResultsProps = {
  data?: AnalysisResult;
  onReset?: () => void;
};

export function AnalysisResults({ data, onReset }: AnalysisResultsProps) {
  if (!data) {
    return <p className="text-sm text-gray-500">No analysis yet.</p>;
  }
  const {
    matchScore,
    matchLabel,
    strengths,
    matchedKeywords,
    missingSkills,
    improvementSuggestions,
    atsChecks,
  } = data;

  return (
    <div className="space-y-6">
      {/* Match Score */}
      <Card className="border-2 border-blue-100 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-blue-700">
                Match Score
              </CardTitle>
              <CardDescription>
                How well your resume matches the job
              </CardDescription>
            </div>
            <Award className="w-12 h-12 text-blue-600" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-end gap-2">
            <span className="text-6xl font-bold text-blue-600">
              {matchScore}%
            </span>
            <span className="text-2xl text-gray-700 mb-2">{matchLabel}</span>
          </div>

          <Progress
            value={matchScore}
            className="h-3 bg-blue-100 [&>div]:bg-blue-600"
          />

          <p className="text-sm text-gray-600">
            This score is based on skills, responsibilities, and ATS-friendliness.
          </p>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-700">Strengths</CardTitle>
          </div>
          <CardDescription>
            What makes your resume stand out
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="space-y-2">
            {strengths.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Matched Keywords */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-blue-700">
              Matched Skills & Keywords
            </CardTitle>
          </div>
          <CardDescription>
            Skills found in both your resume and job description
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((keyword, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-green-50 text-green-800 border border-blue-100"
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Missing Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <CardTitle className="text-blue-700">Missing Skills</CardTitle>
          </div>
          <CardDescription>
            Skills missing from your resume
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-red-50 text-red-700 border border-red-200"
              >
                <XCircle className="w-3 h-3 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-blue-700">
              Improvement Suggestions
            </CardTitle>
          </div>
          <CardDescription>
            Recommendations to enhance your resume
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3">
            {improvementSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
                <span className="text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
          onClick={onReset}
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Analyze Another Resume
        </Button>
      </div>
    </div>
  );
}
