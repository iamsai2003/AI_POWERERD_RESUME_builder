'use client';
import { useResume } from '@/context/ResumeContext';

const templateStyles = {
  minimal: { accent: '#374151', font: 'Inter', bg: '#fff', headerBg: '#f9fafb' },
  modern: { accent: '#6366f1', font: 'Inter', bg: '#fff', headerBg: '#eef2ff' },
  professional: { accent: '#0f766e', font: 'Inter', bg: '#fff', headerBg: '#f0fdfa' },
  creative: { accent: '#ec4899', font: 'Inter', bg: '#fff', headerBg: '#fdf2f8' },
  developer: { accent: '#22c55e', font: 'Inter', bg: '#0f172a', headerBg: '#1e293b', text: '#e2e8f0', subtext: '#94a3b8' },
  ats: { accent: '#000', font: 'Times New Roman', bg: '#fff', headerBg: '#fff' },
};

function SectionTitle({ children, color, isAts }) {
  if (isAts) return (
    <div style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1.5px solid #000', paddingBottom: '2px', marginBottom: '6px', marginTop: '12px', fontFamily: 'Times New Roman' }}>{children}</div>
  );
  return (
    <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color, marginBottom: '8px', marginTop: '14px', paddingBottom: '4px', borderBottom: `2px solid ${color}22` }}>{children}</div>
  );
}

export default function ResumePreview({ template: templateOverride }) {
  const { state } = useResume();
  const tmpl = templateOverride || state.selectedTemplate;
  const s = templateStyles[tmpl] || templateStyles.modern;
  const isDev = tmpl === 'developer';
  const isAts = tmpl === 'ats';
  const isCreative = tmpl === 'creative';
  const textColor = s.text || '#1f2937';
  const subColor = s.subtext || '#6b7280';
  const { personalInfo: p, summary, skills, experience, projects, education, certifications, achievements, languages, customSections } = state;

  const containerStyle = {
    width: '210mm', minHeight: '297mm', background: s.bg, color: textColor, fontFamily: s.font,
    fontSize: '10px', lineHeight: 1.5, padding: 0, margin: '0 auto',
    boxShadow: '0 4px 30px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden',
  };

  const headerStyles = {
    minimal: { background: s.headerBg, padding: '28px 36px', borderBottom: '1px solid #e5e7eb' },
    modern: { background: `linear-gradient(135deg, ${s.accent}, #818cf8)`, padding: '30px 36px', color: '#fff' },
    professional: { background: s.headerBg, padding: '28px 36px', borderLeft: `5px solid ${s.accent}` },
    creative: { background: `linear-gradient(135deg, ${s.accent}, #a855f7)`, padding: '32px 36px', color: '#fff', borderRadius: '0 0 20px 20px' },
    developer: { background: s.headerBg, padding: '28px 36px', borderBottom: `3px solid ${s.accent}` },
    ats: { padding: '24px 36px', textAlign: 'center', borderBottom: '2px solid #000' },
  };

  return (
    <div id="resume-preview" style={containerStyle}>
      {/* Header */}
      <div style={headerStyles[tmpl]}>
        <div style={{ fontSize: isAts ? '18px' : '22px', fontWeight: 800, letterSpacing: '-0.02em', color: ['modern','creative'].includes(tmpl) ? '#fff' : textColor }}>
          {p.fullName || 'Your Name'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isAts ? '8px' : '12px', marginTop: '6px', fontSize: isAts ? '10px' : '9.5px', color: ['modern','creative'].includes(tmpl) ? 'rgba(255,255,255,0.85)' : subColor }}>
          {p.email && <span>{isAts ? '' : '📧 '}{p.email}</span>}
          {p.phone && <span>{isAts ? '| ' : '📱 '}{p.phone}</span>}
          {p.location && <span>{isAts ? '| ' : '📍 '}{p.location}</span>}
          {p.linkedin && <span>{isAts ? '| ' : '🔗 '}{p.linkedin}</span>}
          {p.github && <span>{isAts ? '| ' : '💻 '}{p.github}</span>}
          {p.portfolio && <span>{isAts ? '| ' : '🌐 '}{p.portfolio}</span>}
        </div>
      </div>

      <div style={{ padding: '0 36px 28px' }}>
        {/* Summary */}
        {summary && (<>
          <SectionTitle color={s.accent} isAts={isAts}>Professional Summary</SectionTitle>
          <p style={{ color: isDev ? s.subtext : subColor, lineHeight: 1.7, fontSize: isAts ? '11px' : '10px' }}>{summary}</p>
        </>)}

        {/* Skills */}
        {skills.length > 0 && (<>
          <SectionTitle color={s.accent} isAts={isAts}>Skills</SectionTitle>
          {isAts ? (
            <p style={{ fontSize: '10.5px' }}>{skills.map(sk => sk.name).join(', ')}</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map((sk, i) => (
                <span key={i} style={{
                  fontSize: '9px', padding: '2px 8px', borderRadius: isCreative ? '10px' : '4px',
                  background: isDev ? '#1e293b' : `${s.accent}11`, border: `1px solid ${s.accent}33`,
                  color: isDev ? s.accent : s.accent,
                }}>{sk.name}</span>
              ))}
            </div>
          )}
        </>)}

        {/* Experience */}
        {experience.length > 0 && (<>
          <SectionTitle color={s.accent} isAts={isAts}>Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '11px' }}>{exp.jobTitle}</span>
                <span style={{ fontSize: '9px', color: subColor }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div style={{ color: ['modern','creative'].includes(tmpl) ? s.accent : subColor, fontSize: '10px', fontWeight: 500 }}>
                {exp.company}{exp.location && `, ${exp.location}`}
              </div>
              {exp.responsibilities && (
                <div style={{ marginTop: '4px', whiteSpace: 'pre-wrap', color: isDev ? s.subtext : subColor, fontSize: '10px', lineHeight: 1.6 }}>
                  {exp.responsibilities}
                </div>
              )}
            </div>
          ))}
        </>)}

        {/* Projects */}
        {projects.length > 0 && (<>
          <SectionTitle color={s.accent} isAts={isAts}>Projects</SectionTitle>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ fontWeight: 700, fontSize: '11px' }}>{proj.title}</div>
              {proj.technologies && <div style={{ fontSize: '9px', color: s.accent, marginTop: '1px' }}>{proj.technologies}</div>}
              {proj.description && <div style={{ color: isDev ? s.subtext : subColor, fontSize: '10px', marginTop: '2px' }}>{proj.description}</div>}
              {(proj.githubLink || proj.liveDemo) && (
                <div style={{ fontSize: '9px', color: subColor, marginTop: '2px' }}>
                  {proj.githubLink && <span>GitHub: {proj.githubLink} </span>}
                  {proj.liveDemo && <span>Live: {proj.liveDemo}</span>}
                </div>
              )}
            </div>
          ))}
        </>)}

        {/* Education */}
        {education.length > 0 && (<>
          <SectionTitle color={s.accent} isAts={isAts}>Education</SectionTitle>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: '11px' }}>{edu.degree}</span>
                <span style={{ fontSize: '9px', color: subColor }}>{edu.year}</span>
              </div>
              <div style={{ color: subColor, fontSize: '10px' }}>{edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}</div>
            </div>
          ))}
        </>)}

        {/* Certifications */}
        {certifications.length > 0 && (<>
          <SectionTitle color={s.accent} isAts={isAts}>Certifications</SectionTitle>
          {certifications.map((c, i) => (
            <div key={i} style={{ fontSize: '10px', marginBottom: '3px' }}>
              <strong>{c.name}</strong> — {c.organization} {c.year && `(${c.year})`}
            </div>
          ))}
        </>)}

        {/* Achievements */}
        {achievements.length > 0 && (<>
          <SectionTitle color={s.accent} isAts={isAts}>Achievements</SectionTitle>
          {achievements.map((a, i) => (
            <div key={i} style={{ fontSize: '10px', marginBottom: '3px' }}>
              <strong>{a.title}</strong>{a.description && ` — ${a.description}`}
            </div>
          ))}
        </>)}

        {/* Languages */}
        {languages.length > 0 && (<>
          <SectionTitle color={s.accent} isAts={isAts}>Languages</SectionTitle>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: '10px' }}><strong>{l.language}</strong> — {l.proficiency}</span>
            ))}
          </div>
        </>)}

        {/* Custom Sections */}
        {customSections.map((sec, i) => (
          <div key={i}>
            <SectionTitle color={s.accent} isAts={isAts}>{sec.title}</SectionTitle>
            <div style={{ fontSize: '10px', color: isDev ? s.subtext : subColor, whiteSpace: 'pre-wrap' }}>{sec.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
