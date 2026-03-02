import { Toaster } from "sonner";
import { SideMenu } from "@/components/layout/side-menu";
import { Header } from "@/components/layout/header";
import { UploadForm } from "@/components/upload/upload-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex">
      <Toaster position="top-right" />

      {/* Side Menu: upload active, no result yet */}
      <SideMenu activeSection="upload" hasResult={false} />

      {/* Main Content */}
      <div className="flex-1 sticky">
        <Header />
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            <UploadForm />
          </div>
        </div>
      </div>
    </div>
  );
}