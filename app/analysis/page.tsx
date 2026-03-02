import { FileSearch, Sparkles } from "lucide-react";

import { Toaster } from "sonner";
import { SideMenu } from "../../components/layout/side-menu";
import { Header } from "../../components/layout/header";
import { AnalysisResults } from "../../components/Result/analysis-result";
export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex">
      <Toaster position="top-right" />

      {/* Side Menu */}
      <SideMenu />

      {/* Main Content */}
      <div className="flex-1 sticky">
        {/* Header */}
        <Header />
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            <AnalysisResults />
          </div>
        </div>
      </div>
    </div>
  );
}
