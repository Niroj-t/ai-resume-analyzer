# AI-Powered Resume Analyzer

AI-Powered Resume Analyzer is a web application that helps job seekers optimize their resumes. Built with **Next.js**, **NextAuth**, **Prisma**, **Neon PostgreSQL**, and **Gemini API**, it allows users to upload resumes, compare them with job descriptions, and receive instant ATS-style feedback.

---

## 🚀 Features

- **Resume Upload:** Easily upload resumes in PDF or DOCX format.
- **Job Description Comparison:** Match your resume against a job description to see compatibility.
- **ATS Feedback:** Get instant feedback on formatting, keyword usage, and overall ATS-friendliness.
- **Secure Authentication:** Login using **Google** or **GitHub** via **NextAuth**.
- **Cloud Database:** All data securely stored in **Neon PostgreSQL**.
- **AI-Powered Analysis:** Powered by **Gemini API** for intelligent suggestions and improvements.

---

## 🛠 Tech Stack

- **Frontend:** Next.js (React framework)
- **Authentication:** NextAuth.js with Google/GitHub providers
- **Database:** PostgreSQL hosted on Neon
- **ORM:** Prisma
- **AI API:** Gemini API
- **File Handling:** Supports PDF and DOCX resume parsing

---

## 📥 Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL (Neon)
- Gemini API key
- Google/GitHub OAuth credentials

### Installation

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
npm install
