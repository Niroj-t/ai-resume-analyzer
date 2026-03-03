// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md rounded-2xl bg-white/80 shadow-lg px-8 py-10">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/upload" })}
            className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-border bg-white hover:bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/upload" })}
            className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-border bg-white hover:bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors"
          >
            <FaGithub size={20} />
            <span>Continue with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}