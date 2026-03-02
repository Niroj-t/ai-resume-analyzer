import { Toaster } from "sonner";
import { SideMenu } from "@/components/layout/side-menu";
import { Header } from "@/components/layout/header";
import { AnalysisResults } from "@/components/Result/analysis-result";
import { db } from "@/lib/db";
import type { AnalysisResult } from "@/lib/types";

type AnalysisSearchParams = {
  analysisId?: string | string[];
};

type AnalysisPageProps = {
  searchParams: Promise<AnalysisSearchParams>;
};


export default async function AnalysisPage({ searchParams }: AnalysisPageProps) {
  const params = await searchParams;              // ✅ unwrap the Promise
  const rawId = params.analysisId;
  const analysisId =
    typeof rawId === "string" ? rawId : rawId?.[0]; // handle string | string[]

  if (!analysisId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">No analysis selected.</p>
      </div>
    );
  }

  const analysis = await db.analysis.findUnique({
    where: { id: analysisId },
  });

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-600">Analysis not found.</p>
      </div>
    );
  }

  const data = analysis.resultJson as AnalysisResult;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex">
      <Toaster position="top-right" />
      <SideMenu activeSection="analysis" hasResult={true} />
      <div className="flex-1 sticky">
        <Header />
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            <AnalysisResults data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}