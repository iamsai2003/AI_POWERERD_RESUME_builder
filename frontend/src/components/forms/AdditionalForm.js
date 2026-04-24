'use client';
import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';

const emptyCert = { name: '', organization: '', year: '' };
const emptyAchievement = { title: '', description: '' };
const emptyLanguage = { language: '', proficiency: 'Professional' };

const proficiencyOptions = ['Native', 'Professional', 'Fluent', 'Intermediate', 'Basic'];

export default function AdditionalForm() {
  const { state, dispatch } = useResume();
  const [certForm, setCertForm] = useState(emptyCert);
  const [achForm, setAchForm] = useState(emptyAchievement);
  const [langForm, setLangForm] = useState(emptyLanguage);
  const [customTitle, setCustomTitle] = useState('');
  const [customContent, setCustomContent] = useState('');

  const addCert = () => {
    if (!certForm.name.trim()) return;
    dispatch({ type: 'ADD_CERTIFICATION', payload: certForm });
    setCertForm(emptyCert);
  };

  const addAchievement = () => {
    if (!achForm.title.trim()) return;
    dispatch({ type: 'ADD_ACHIEVEMENT', payload: achForm });
    setAchForm(emptyAchievement);
  };

  const addLanguage = () => {
    if (!langForm.language.trim()) return;
    dispatch({ type: 'ADD_LANGUAGE', payload: langForm });
    setLangForm(emptyLanguage);
  };

  const addCustom = () => {
    if (!customTitle.trim()) return;
    dispatch({ type: 'ADD_CUSTOM_SECTION', payload: { title: customTitle, content: customContent } });
    setCustomTitle('');
    setCustomContent('');
  };

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{
        fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const ItemTag = ({ children, onRemove }) => (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      background: 'var(--surface)', border: '1px solid var(--surface-lighter)',
      borderRadius: '0.75rem', padding: '0.5rem 0.75rem',
      fontSize: '0.8125rem',
    }}>
      <span>{children}</span>
      <button onClick={onRemove} style={{
        background: 'none', border: 'none', color: 'var(--text-muted)',
        cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: 0,
      }}>×</button>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
          Additional Information
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Certifications, achievements, languages, and custom sections.
        </p>
      </div>

      {/* Certifications */}
      <Section title="🏆 Certifications">
        {state.certifications.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {state.certifications.map((c, i) => (
              <ItemTag key={i} onRemove={() => dispatch({ type: 'REMOVE_CERTIFICATION', payload: i })}>
                <strong>{c.name}</strong> — {c.organization} {c.year && `(${c.year})`}
              </ItemTag>
            ))}
          </div>
        )}
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: '0.75rem', alignItems: 'end' }}>
            <div>
              <label className="input-label">Certificate Name</label>
              <input className="input-field" placeholder="AWS Solutions Architect"
                value={certForm.name} onChange={(e) => setCertForm({ ...certForm, name: e.target.value })} />
            </div>
            <div>
              <label className="input-label">Organization</label>
              <input className="input-field" placeholder="Amazon"
                value={certForm.organization} onChange={(e) => setCertForm({ ...certForm, organization: e.target.value })} />
            </div>
            <div>
              <label className="input-label">Year</label>
              <input className="input-field" placeholder="2024" style={{ width: '100px' }}
                value={certForm.year} onChange={(e) => setCertForm({ ...certForm, year: e.target.value })} />
            </div>
            <button className="btn-primary" onClick={addCert} style={{ height: '42px' }}>+ Add</button>
          </div>
        </div>
      </Section>

      {/* Achievements */}
      <Section title="⭐ Achievements & Awards">
        {state.achievements.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {state.achievements.map((a, i) => (
              <ItemTag key={i} onRemove={() => dispatch({ type: 'REMOVE_ACHIEVEMENT', payload: i })}>
                <strong>{a.title}</strong> {a.description && `— ${a.description}`}
              </ItemTag>
            ))}
          </div>
        )}
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.75rem', alignItems: 'end' }}>
            <div>
              <label className="input-label">Achievement Title</label>
              <input className="input-field" placeholder="1st Place - Hackathon 2024"
                value={achForm.title} onChange={(e) => setAchForm({ ...achForm, title: e.target.value })} />
            </div>
            <div>
              <label className="input-label">Description (optional)</label>
              <input className="input-field" placeholder="Built an AI-powered tool in 24 hours"
                value={achForm.description} onChange={(e) => setAchForm({ ...achForm, description: e.target.value })} />
            </div>
            <button className="btn-primary" onClick={addAchievement} style={{ height: '42px' }}>+ Add</button>
          </div>
        </div>
      </Section>

      {/* Languages */}
      <Section title="🌐 Languages Known">
        {state.languages.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {state.languages.map((l, i) => (
              <ItemTag key={i} onRemove={() => dispatch({ type: 'REMOVE_LANGUAGE', payload: i })}>
                <strong>{l.language}</strong> — {l.proficiency}
              </ItemTag>
            ))}
          </div>
        )}
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.75rem', alignItems: 'end' }}>
            <div>
              <label className="input-label">Language</label>
              <input className="input-field" placeholder="English"
                value={langForm.language} onChange={(e) => setLangForm({ ...langForm, language: e.target.value })} />
            </div>
            <div>
              <label className="input-label">Proficiency</label>
              <select className="input-field" value={langForm.proficiency}
                onChange={(e) => setLangForm({ ...langForm, proficiency: e.target.value })}
                style={{ cursor: 'pointer', minWidth: '140px' }}>
                {proficiencyOptions.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <button className="btn-primary" onClick={addLanguage} style={{ height: '42px' }}>+ Add</button>
          </div>
        </div>
      </Section>

      {/* Custom Sections */}
      <Section title="📝 Custom Sections">
        {state.customSections.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {state.customSections.map((s, i) => (
              <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{s.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>
                    {s.content}
                  </div>
                </div>
                <button onClick={() => dispatch({ type: 'REMOVE_CUSTOM_SECTION', payload: i })} style={{
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#fca5a5', borderRadius: '0.5rem', padding: '0.375rem 0.75rem',
                  fontSize: '0.75rem', cursor: 'pointer', marginLeft: '1rem',
                }}>Delete</button>
              </div>
            ))}
          </div>
        )}
        <div className="card">
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div>
              <label className="input-label">Section Title</label>
              <input className="input-field" placeholder="e.g., Publications, Volunteer Work, Internships"
                value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} />
            </div>
            <div>
              <label className="input-label">Content</label>
              <textarea className="input-field" placeholder="Add details for this section..."
                value={customContent} onChange={(e) => setCustomContent(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={addCustom} style={{ justifySelf: 'start' }}>
              + Add Custom Section
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
