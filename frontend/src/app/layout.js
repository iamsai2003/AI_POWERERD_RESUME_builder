import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext";

export const metadata = {
  title: "AI Resume Builder — Create Professional Resumes with AI",
  description: "Build stunning, ATS-optimized resumes in minutes. AI-powered content generation, 6 professional templates, and instant PDF export.",
  keywords: "resume builder, AI resume, ATS resume, professional resume, CV builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
