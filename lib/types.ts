export type AnalysisResult = {
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

