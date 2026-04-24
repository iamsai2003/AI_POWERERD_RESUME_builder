const express = require('express');
const router = express.Router();

let GoogleGenerativeAI = null;
try {
  const genai = require('@google/generative-ai');
  GoogleGenerativeAI = genai.GoogleGenerativeAI;
} catch (e) { /* optional */ }

const getClient = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'your_gemini_api_key_here' || !GoogleGenerativeAI) return null;
  return new GoogleGenerativeAI(key);
};

// ─── Smart Local AI Engine ─────────────────────────────────────────────────────
// Generates professional, context-aware resume content without any API key.

const actionVerbs = [
  'Spearheaded', 'Architected', 'Developed', 'Implemented', 'Optimized',
  'Engineered', 'Streamlined', 'Orchestrated', 'Delivered', 'Pioneered',
  'Designed', 'Built', 'Led', 'Transformed', 'Automated', 'Revamped',
  'Accelerated', 'Mentored', 'Launched', 'Scaled', 'Integrated', 'Migrated',
];

const metrics = [
  'reducing load time by 40%', 'improving performance by 35%',
  'increasing user engagement by 50%', 'cutting costs by 30%',
  'boosting productivity by 25%', 'serving 10K+ daily users',
  'reducing bugs by 60%', 'achieving 99.9% uptime',
  'processing 1M+ requests daily', 'decreasing response time by 45%',
  'growing user base by 200%', 'saving 20+ engineering hours per week',
];

const skillMap = {
  'frontend': {
    'Programming Languages': ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
    'Frameworks': ['React.js', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS'],
    'Tools': ['Webpack', 'Vite', 'Jest', 'Cypress', 'Figma', 'Storybook'],
    'Soft Skills': ['UI/UX Design', 'Problem Solving', 'Communication'],
  },
  'backend': {
    'Programming Languages': ['Python', 'Java', 'Go', 'TypeScript', 'C#'],
    'Frameworks': ['Node.js', 'Express', 'Django', 'FastAPI', 'Spring Boot'],
    'Tools': ['Docker', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Nginx', 'AWS'],
    'Soft Skills': ['System Design', 'Analytical Thinking', 'Collaboration'],
  },
  'fullstack': {
    'Programming Languages': ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    'Frameworks': ['React.js', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
    'Tools': ['Docker', 'MongoDB', 'PostgreSQL', 'Git', 'AWS', 'Vercel'],
    'Soft Skills': ['Problem Solving', 'Team Leadership', 'Agile/Scrum'],
  },
  'data': {
    'Programming Languages': ['Python', 'R', 'SQL', 'Scala'],
    'Frameworks': ['TensorFlow', 'PyTorch', 'Pandas', 'Scikit-learn', 'Spark'],
    'Tools': ['Jupyter', 'Tableau', 'Power BI', 'Airflow', 'BigQuery', 'AWS'],
    'Soft Skills': ['Statistical Analysis', 'Data Storytelling', 'Critical Thinking'],
  },
  'devops': {
    'Programming Languages': ['Python', 'Bash', 'Go', 'YAML'],
    'Frameworks': ['Terraform', 'Ansible', 'Kubernetes', 'Docker Compose'],
    'Tools': ['AWS', 'GCP', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana'],
    'Soft Skills': ['Automation Mindset', 'Incident Management', 'Collaboration'],
  },
  'mobile': {
    'Programming Languages': ['Kotlin', 'Swift', 'Dart', 'TypeScript'],
    'Frameworks': ['React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose'],
    'Tools': ['Xcode', 'Android Studio', 'Firebase', 'Fastlane', 'Figma'],
    'Soft Skills': ['UX Thinking', 'Performance Optimization', 'Collaboration'],
  },
  'default': {
    'Programming Languages': ['JavaScript', 'Python', 'Java', 'SQL'],
    'Frameworks': ['React.js', 'Node.js', 'Django', 'Spring Boot'],
    'Tools': ['Git', 'Docker', 'VS Code', 'Jira', 'Postman', 'AWS'],
    'Soft Skills': ['Problem Solving', 'Communication', 'Team Collaboration', 'Adaptability'],
  },
};

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function detectRole(data) {
  const text = JSON.stringify(data).toLowerCase();
  if (text.includes('frontend') || text.includes('react') || text.includes('vue') || text.includes('angular') || text.includes('css')) return 'frontend';
  if (text.includes('backend') || text.includes('django') || text.includes('spring') || text.includes('fastapi') || text.includes('express')) return 'backend';
  if (text.includes('fullstack') || text.includes('full stack') || text.includes('full-stack') || text.includes('mern') || text.includes('mean')) return 'fullstack';
  if (text.includes('data') || text.includes('machine learning') || text.includes('ml') || text.includes('analytics') || text.includes('tensorflow')) return 'data';
  if (text.includes('devops') || text.includes('cloud') || text.includes('kubernetes') || text.includes('terraform') || text.includes('ci/cd')) return 'devops';
  if (text.includes('mobile') || text.includes('android') || text.includes('ios') || text.includes('flutter') || text.includes('react native')) return 'mobile';
  return 'default';
}

function generateSummary(data) {
  const name = data.personalInfo?.fullName || 'A dedicated professional';
  const expCount = data.experience?.length || 0;
  const skills = data.skills?.map(s => s.name).slice(0, 5) || [];
  const latestRole = data.experience?.[0]?.jobTitle || '';
  const latestCompany = data.experience?.[0]?.company || '';
  const edu = data.education?.[0]?.degree || '';
  const role = detectRole(data);

  const roleDescriptors = {
    frontend: 'front-end development and user interface engineering',
    backend: 'back-end architecture and server-side development',
    fullstack: 'full-stack development and end-to-end application engineering',
    data: 'data science, analytics, and machine learning',
    devops: 'DevOps engineering and cloud infrastructure',
    mobile: 'mobile application development',
    default: 'software development and engineering',
  };

  const parts = [];
  
  if (expCount > 0) {
    parts.push(`Results-driven ${latestRole || 'professional'} with ${expCount}+ years of hands-on experience in ${roleDescriptors[role]}.`);
  } else if (edu) {
    parts.push(`Motivated ${edu} graduate with a strong foundation in ${roleDescriptors[role]}.`);
  } else {
    parts.push(`Passionate and detail-oriented professional specializing in ${roleDescriptors[role]}.`);
  }

  if (skills.length > 0) {
    parts.push(`Proficient in ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? `, and ${skills.length - 3} more technologies` : ''}.`);
  }

  if (latestCompany) {
    parts.push(`Most recently at ${latestCompany}, delivering high-impact solutions that drive business growth and user satisfaction.`);
  } else {
    parts.push(`Committed to writing clean, maintainable code and delivering solutions that create measurable impact.`);
  }

  parts.push('Eager to leverage technical expertise and collaborative mindset to contribute to innovative teams.');

  return parts.join(' ');
}

function enhanceBullets(data) {
  const text = (data.text || '').toLowerCase();
  const title = data.jobTitle || '';
  const bullets = [];

  // Parse existing text into themes
  const themes = [];
  if (text.includes('develop') || text.includes('build') || text.includes('creat') || text.includes('code')) themes.push('development');
  if (text.includes('lead') || text.includes('manage') || text.includes('team') || text.includes('mentor')) themes.push('leadership');
  if (text.includes('test') || text.includes('debug') || text.includes('fix') || text.includes('bug')) themes.push('quality');
  if (text.includes('deploy') || text.includes('release') || text.includes('ci') || text.includes('pipeline')) themes.push('deployment');
  if (text.includes('design') || text.includes('architect') || text.includes('plan') || text.includes('ui')) themes.push('design');
  if (text.includes('api') || text.includes('integrat') || text.includes('service') || text.includes('endpoint')) themes.push('integration');
  if (text.includes('database') || text.includes('sql') || text.includes('data') || text.includes('query')) themes.push('data');
  if (text.includes('performance') || text.includes('optim') || text.includes('speed') || text.includes('fast')) themes.push('optimization');
  if (themes.length === 0) themes.push('development', 'quality');

  const bulletTemplates = {
    development: [
      `${pickRandom(actionVerbs, 1)[0]} the development of key application features using modern frameworks, ${pickRandom(metrics, 1)[0]}`,
      `Built and maintained scalable, production-grade codebases serving thousands of users with high reliability`,
      `Developed reusable component libraries and shared modules, accelerating team development velocity by 30%`,
    ],
    leadership: [
      `Led a cross-functional team of engineers through agile sprints, consistently delivering milestones ahead of schedule`,
      `Mentored ${Math.floor(Math.random() * 4) + 2} junior developers through code reviews and pair programming, improving team code quality by 40%`,
      `Coordinated with product managers and stakeholders to translate business requirements into technical specifications`,
    ],
    quality: [
      `Implemented comprehensive testing strategy (unit, integration, E2E), achieving ${85 + Math.floor(Math.random() * 14)}% code coverage`,
      `Reduced production bug rate by 55% through introduction of automated testing pipelines and code review processes`,
      `Established coding standards and best practices documentation adopted across the engineering organization`,
    ],
    deployment: [
      `Architected CI/CD pipelines using GitHub Actions, reducing deployment time from hours to minutes`,
      `Automated infrastructure provisioning with IaC tools, enabling zero-downtime deployments across environments`,
      `Managed production releases for applications serving 50K+ daily active users with 99.9% uptime`,
    ],
    design: [
      `Designed intuitive user interfaces following accessibility standards (WCAG 2.1), improving user satisfaction scores by 35%`,
      `Created responsive, mobile-first designs that increased mobile engagement by 45%`,
      `Collaborated with UX researchers to implement data-driven design improvements across core user flows`,
    ],
    integration: [
      `Engineered RESTful APIs and microservices architecture, enabling seamless integration across platform modules`,
      `Integrated third-party services (payment, auth, analytics) into the platform, expanding product capabilities`,
      `Designed and documented API contracts used by 5+ internal and external consumer teams`,
    ],
    data: [
      `Optimized complex database queries and indexing strategies, ${pickRandom(metrics, 1)[0]}`,
      `Designed and implemented data pipelines processing millions of records daily with fault tolerance`,
      `Built real-time analytics dashboards providing actionable insights to stakeholders across the organization`,
    ],
    optimization: [
      `Optimized application performance through code splitting, lazy loading, and caching strategies, ${pickRandom(metrics, 1)[0]}`,
      `Conducted performance audits and implemented optimizations that improved Core Web Vitals scores by 40%`,
      `Refactored legacy codebase reducing bundle size by 50% and improving page load times significantly`,
    ],
  };

  for (const theme of themes.slice(0, 4)) {
    const available = bulletTemplates[theme] || bulletTemplates.development;
    bullets.push(pickRandom(available, 1)[0]);
  }

  // Always add at least 3 bullets
  while (bullets.length < 3) {
    const extraThemes = ['development', 'quality', 'optimization'];
    const t = extraThemes[bullets.length % extraThemes.length];
    const available = bulletTemplates[t];
    const pick = available[Math.floor(Math.random() * available.length)];
    if (!bullets.includes(pick)) bullets.push(pick);
  }

  return bullets.slice(0, 5);
}

function suggestSkills(data) {
  const role = data.role || '';
  const currentSkills = (data.currentSkills || []).map(s => s.toLowerCase());
  const detectedRole = detectRole({ experience: [{ jobTitle: role }] });
  const map = skillMap[detectedRole] || skillMap.default;

  const suggestions = [];
  for (const category of Object.values(map)) {
    for (const skill of category) {
      if (!currentSkills.includes(skill.toLowerCase())) {
        suggestions.push(skill);
      }
    }
  }

  return pickRandom(suggestions, Math.min(8, suggestions.length));
}

function rewriteContent(data) {
  const text = data.text || '';
  if (!text.trim()) return 'Please provide content to rewrite.';

  // Simple professional rewrite logic
  let result = text
    .replace(/\bi worked on\b/gi, 'Spearheaded')
    .replace(/\bi helped\b/gi, 'Contributed to')
    .replace(/\bi did\b/gi, 'Executed')
    .replace(/\bi made\b/gi, 'Developed')
    .replace(/\bi was responsible for\b/gi, 'Owned and managed')
    .replace(/\bi used\b/gi, 'Leveraged')
    .replace(/\bgood\b/gi, 'exceptional')
    .replace(/\bteam player\b/gi, 'collaborative team member')
    .replace(/\bhard worker\b/gi, 'results-driven professional')
    .replace(/\ba lot of\b/gi, 'extensive')
    .replace(/\bhelped the team\b/gi, 'empowered the team')
    .replace(/\bworked with\b/gi, 'partnered with');

  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);
  if (!result.endsWith('.')) result += '.';

  return result;
}

function calculateAtsScore(data) {
  const resumeData = data.resumeData || {};
  let score = 0;
  const suggestions = [];

  // Personal info completeness (15 points)
  const pi = resumeData.personalInfo || {};
  let piScore = 0;
  if (pi.fullName) piScore += 3;
  if (pi.email) piScore += 3;
  if (pi.phone) piScore += 3;
  if (pi.location) piScore += 3;
  if (pi.linkedin) piScore += 3;
  score += piScore;
  if (piScore < 12) suggestions.push('Complete all contact information fields — ATS systems expect full name, email, phone, and location.');

  // Summary (15 points)
  const summary = resumeData.summary || '';
  if (summary.length > 50) { score += 10; } else if (summary.length > 0) { score += 5; }
  if (summary.length > 100) score += 5;
  if (summary.length < 50) suggestions.push('Add a professional summary of 2-3 sentences. Include your target role and key skills for maximum ATS impact.');

  // Skills (20 points)
  const skills = resumeData.skills || [];
  if (skills.length >= 8) { score += 20; }
  else if (skills.length >= 5) { score += 14; }
  else if (skills.length >= 3) { score += 8; }
  else if (skills.length > 0) { score += 4; }
  if (skills.length < 5) suggestions.push('Add more skills (aim for 8-12). Include both technical and soft skills relevant to your target position.');

  // Experience (25 points)
  const exp = resumeData.experience || [];
  if (exp.length > 0) {
    score += 8;
    const hasBullets = exp.some(e => (e.responsibilities || '').includes('•') || (e.responsibilities || '').length > 100);
    if (hasBullets) score += 7;
    else suggestions.push('Use bullet points (•) for responsibilities. Start each with an action verb for better ATS parsing.');

    const hasQuantified = exp.some(e => /\d+%|\d+\+|\d+x|\$\d+/i.test(e.responsibilities || ''));
    if (hasQuantified) score += 5;
    else suggestions.push('Add quantifiable achievements (e.g., "Improved performance by 35%", "Managed team of 8") to strengthen your impact.');

    const hasDates = exp.every(e => e.startDate);
    if (hasDates) score += 5;
    else suggestions.push('Ensure all experience entries have start and end dates — ATS systems flag missing dates.');
  } else {
    suggestions.push('Add at least one work experience entry. Even internships or volunteer work count.');
  }

  // Education (10 points)
  const edu = resumeData.education || [];
  if (edu.length > 0) {
    score += 7;
    if (edu[0].year) score += 3;
  } else {
    suggestions.push('Add your educational background — most ATS systems require at least one education entry.');
  }

  // Projects (5 points)
  if ((resumeData.projects || []).length > 0) score += 5;
  else suggestions.push('Add projects to showcase practical skills. Include technologies used for better keyword matching.');

  // Extra sections (10 points)
  if ((resumeData.certifications || []).length > 0) score += 4;
  if ((resumeData.languages || []).length > 0) score += 3;
  if ((resumeData.achievements || []).length > 0) score += 3;

  // General tips if score is reasonable
  if (suggestions.length < 3) {
    if (!summary.toLowerCase().includes(data.targetRole?.toLowerCase() || '___')) {
      suggestions.push('Tailor your summary to mention the specific job title you\'re targeting for higher ATS relevance.');
    }
    suggestions.push('Use standard section headings (Experience, Education, Skills) — creative headings confuse ATS parsers.');
  }

  score = Math.min(100, Math.max(0, score));

  return { score, suggestions: suggestions.slice(0, 6) };
}

// ─── Routes ────────────────────────────────────────────────────────────────────

const localAI = {
  'generate-summary': (data) => generateSummary(data),
  'enhance-bullets': (data) => enhanceBullets(data),
  'suggest-skills': (data) => suggestSkills(data),
  'rewrite-content': (data) => rewriteContent(data),
  'ats-score': (data) => calculateAtsScore(data),
};

router.post('/generate', async (req, res) => {
  try {
    const { action, data } = req.body;
    const client = getClient();

    // If no Gemini key, use local smart engine
    if (!client) {
      const handler = localAI[action];
      if (!handler) return res.status(400).json({ error: 'Unknown action' });
      return res.json({ result: handler(data), engine: 'local' });
    }

    // ─── Gemini path (when API key is configured) ────────────────────────
    let prompt = '';
    const systemPrompt = 'You are a professional resume writer and career coach. Generate concise, impactful, ATS-friendly content. Never fabricate achievements. Respond with valid JSON only.';

    switch (action) {
      case 'generate-summary':
        prompt = `Generate a professional resume summary (2-3 sentences) based on:\nName: ${data.personalInfo?.fullName}\nSkills: ${data.skills?.map(s => s.name).join(', ')}\nExperience: ${JSON.stringify(data.experience?.slice(0, 3))}\nEducation: ${JSON.stringify(data.education?.slice(0, 2))}\n\nReturn JSON: { "summary": "..." }`;
        break;
      case 'enhance-bullets':
        prompt = `Transform these job responsibilities into strong, achievement-based resume bullet points with action verbs and quantified results.\n\nInput: "${data.text}"\nJob Title: ${data.jobTitle || 'N/A'}\nCompany: ${data.company || 'N/A'}\n\nReturn JSON: { "bullets": ["bullet1", "bullet2", "bullet3"] }`;
        break;
      case 'suggest-skills':
        prompt = `Suggest 8-10 relevant skills for:\nRole: ${data.role}\nCurrent Skills: ${data.currentSkills?.join(', ')}\nLevel: ${data.experienceLevel}\n\nReturn JSON: { "skills": ["skill1", ...] }`;
        break;
      case 'rewrite-content':
        prompt = `Rewrite this resume content to be more professional and ATS-friendly:\n"${data.text}"\nContext: ${data.context || 'Resume section'}\n\nReturn JSON: { "rewritten": "..." }`;
        break;
      case 'ats-score':
        prompt = `Analyze this resume for ATS compatibility (score 0-100) with improvement suggestions:\n${JSON.stringify(data.resumeData)}\nTarget Role: ${data.targetRole}\n\nReturn JSON: { "score": 75, "suggestions": ["...", "..."] }`;
        break;
      default:
        return res.status(400).json({ error: 'Unknown action' });
    }

    const model = client.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt 
    });

    const completion = await model.generateContent(prompt);
    const responseText = completion.response.text();

    let result;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : responseText;
    } catch { result = responseText; }

    const keyMap = { 'generate-summary': 'summary', 'enhance-bullets': 'bullets', 'suggest-skills': 'skills', 'rewrite-content': 'rewritten' };
    const normalized = action === 'ats-score'
      ? { score: result.score || 0, suggestions: result.suggestions || [] }
      : result[keyMap[action]] || result;

    res.json({ result: normalized, engine: 'gemini' });

  } catch (error) {
    console.error('AI error:', error.message);
    // Fallback to local engine on any error
    const { action, data } = req.body;
    const handler = localAI[action];
    if (handler) return res.json({ result: handler(data), engine: 'local', note: 'Fell back to local engine' });
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

module.exports = router;
