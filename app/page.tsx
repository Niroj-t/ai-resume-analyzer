// app/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Not logged in → show login page
    redirect("/login");
  }

  // Logged in → go directly to upload
  redirect("/upload");
}