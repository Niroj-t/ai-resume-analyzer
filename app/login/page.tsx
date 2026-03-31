"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FileText } from "lucide-react";

export default function Login() {
  return (
    <div
      className="min-h-screen flex bg-cover bg-center relative lg:bg-none"
      style={{
        backgroundImage: "url(/images/bg.jpg)",
      }}
    >
      {/* Mobile Overlay */}
      <div className="absolute inset-0 bg-black/40 lg:hidden"></div>

      {/* Left Panel (Desktop Only) */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage: `url(/images/bg.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/90 via-blue-400/50 to-purple-400/50"></div>

        <div className="relative z-10 flex flex-col justify-center items-center px-28 gap-2 text-white text-center h-full">
          <h1 className="text-6xl mb-4 font-bold">Resume Analyzer</h1>
          <p className="text-lg max-w-xl leading-relaxed">
            Leading the industry with innovative AI-powered
            <br />
            resume analysis.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
            <div className="h-1.5 bg-linear-to-r from-blue-600 to-purple-600"></div>

            <div className="p-10">
              <div className="flex justify-center mb-6">
                <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl p-3">
                  <FileText className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl text-gray-900 mb-2">Welcome Back!</h2>
                <p className="text-sm text-gray-500">Sign in to your account</p>
              </div>

              <div className="space-y-3">
                {/* Google Login */}
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/upload" })}
                  className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span className="text-gray-700">Sign in with Google</span>
                </button>

                {/* GitHub Login */}
                <button
                  type="button"
                  onClick={() => signIn("github", { callbackUrl: "/upload" })}
                  className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200 hover:border-gray-800 hover:bg-gray-50 transition-all"
                >
                  <FaGithub size={20} />
                  <span className="text-gray-700">Sign in with GitHub</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Text */}
          <div className="lg:hidden absolute top-20 left-0 w-full text-center text-white z-10 px-4">
            <h1 className="text-3xl mb-2 font-bold">AI Resume Analyzer</h1>
            <p className="text-lg text-gray-200">
              Optimize your resume
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
