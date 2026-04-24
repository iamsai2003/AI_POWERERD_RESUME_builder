# AI Resume Builder 🚀

An AI-powered web application that helps you create professional, ATS-optimized resumes in minutes.

## Features

- **🤖 AI-Powered Content** — Generate summaries, enhance bullet points, and get skill suggestions
- **🎯 ATS Optimization** — Real-time ATS scoring and improvement suggestions
- **🎨 6 Premium Templates** — Minimal, Modern, Professional, Creative, Developer, ATS-Optimized
- **📄 PDF Export** — Download your resume as a perfectly formatted PDF
- **💾 Auto-Save** — Progress automatically saved to localStorage
- **✨ Smart Enhancement** — AI transforms responsibilities into achievement-based statements

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React, Tailwind CSS v4 |
| Backend | Node.js, Express |
| AI | Gemini API (Gemini 1.5 Flash or Pro) |
| PDF | html2pdf.js (client-side) |

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Start the Backend

```bash
cd backend
cp .env .env.local  # Optional: add your Gemini API key
npm install
npm run dev
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Open the App

Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Gemini API Key (Optional)

Add your Gemini API key in `backend/.env`:

```
GEMINI_API_KEY=AIzaSy...
```

Without an API key, the app will use intelligent fallback responses for all AI features.

## Project Structure

```
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/        # Pages (landing, builder)
│   │   ├── components/ # Form and preview components
│   │   ├── context/    # Resume state management
│   │   └── lib/        # Utilities
│   └── package.json
├── backend/            # Express API server
│   ├── server.js
│   ├── routes/ai.js    # AI generation endpoints
│   └── .env
└── README.md
```

## User Flow

1. **Landing Page** → Click "Create My Resume"
2. **Builder** → Fill in 7 sections (Personal, Summary, Skills, Experience, Projects, Education, Additional)
3. **AI Enhance** → Use AI buttons to generate summaries, enhance bullet points, suggest skills
4. **Preview** → Switch between 6 templates in real-time
5. **ATS Check** → Get your ATS compatibility score
6. **Export** → Download as PDF
