"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FileText, Sparkles, CheckCircle } from "lucide-react";
export default function Login() {
  return (
     <div className="min-h-screen flex">
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage: `url(/images/bg.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/90 via-blue-400/50 to-purple-400/50"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center px-28 gap-2 text-white text-center h-full">
          <h1 className="text-6xl mb-4 font-bold">
            Resume Analyzer
          </h1>
          <p className="text-lg text-white max-w-xl leading-relaxed">
            Leading the industry with innovative AI-powered<br></br>
            resume analysis for job seekers.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-1.5 bg-linear-to-r from-blue-600 to-purple-600"></div>
            
            <div className="p-10">
              <div className="flex justify-center mb-6">
                <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl p-3">
                  <FileText className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-2xl text-gray-900 mb-2">
                  Welcome Back!
                </h2>
                <p className="text-sm text-gray-500">
                  Sign in to your account
                </p>
              </div>

              <div className="space-y-3">
                {/* Google Login */}
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/upload" })}
                  className="w-full h-12 text-base flex items-center rounded-xl justify-center gap-3 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span className="text-gray-700">Sign in with Google</span>
                </button>

                {/* GitHub Login */}
                <button
                  type="button"
                  onClick={() => signIn("github", { callbackUrl: "/upload" })}
                  className="w-full h-12 text-base flex items-center justify-center rounded-xl gap-3 border-2 border-gray-200 hover:border-gray-800 hover:bg-gray-50 transition-all"
                >
                  <FaGithub size={20} />
                  <span className="text-gray-700">Sign in with GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">Quick & Secure Authentication</span>
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Logo - Shows on small screens */}
          <div className="lg:hidden text-center mt-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl">AI Resume Analyzer</h1>
            </div>
            <p className="text-sm text-gray-600">
              Optimize your resume with AI-powered insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}