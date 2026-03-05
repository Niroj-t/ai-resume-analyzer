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

### Environment Variables

Create a .env file in the root directory:

DATABASE_URL=your_neon_postgresql_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=your_nextauth_secret

### Database Setup
npx prisma generate
npx prisma migrate dev --name init

Running Locally
npm run dev

Open http://localhost:3000
 to view the app.

### Installation

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
npm install

