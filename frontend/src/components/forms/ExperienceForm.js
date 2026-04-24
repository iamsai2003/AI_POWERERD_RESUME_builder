'use client';
import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';

const emptyExperience = {
  jobTitle: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  responsibilities: '',
};

export default function ExperienceForm() {
  const { state, dispatch, aiGenerate } = useResume();
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(emptyExperience);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  const handleSubmit = () => {
    if (!form.jobTitle.trim() || !form.company.trim()) return;
    if (editIndex !== null) {
      dispatch({ type: 'UPDATE_EXPERIENCE', payload: { index: editIndex, data: form } });
      setEditIndex(null);
    } else {
      dispatch({ type: 'ADD_EXPERIENCE', payload: form });
    }
    setForm(emptyExperience);
  };

  const handleEdit = (index) => {
    setForm(state.experience[index]);
    setEditIndex(index);
  };

  const handleCancel = () => {
    setForm(emptyExperience);
    setEditIndex(null);
  };

  const enhanceBullets = async () => {
    if (!form.responsibilities.trim()) return;
    setLoadingAI(true);
    setAiMessage('');
    try {
      const res = await aiGenerate('enhance-bullets', {
        text: form.responsibilities,
        jobTitle: form.jobTitle,
        company: form.company,
      });
      const bullets = Array.isArray(res.result) ? res.result.join('\n• ') : res.result;
      setForm({ ...form, responsibilities: '• ' + bullets });
      setAiMessage('✨ Bullet points enhanced!');
    } catch {
      setAiMessage('⚠️ Could not reach AI service.');
    }
    setLoadingAI(false);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
          Work Experience
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Add your work history. Use AI to enhance your bullet points.
        </p>
      </div>

      {/* Existing entries */}
      {state.experience.length > 0 && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {state.experience.map((exp, i) => (
            <div key={i} className="card" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>{exp.jobTitle}</div>
                <div style={{ color: 'var(--primary-light)', fontSize: '0.875rem' }}>
                  {exp.company} {exp.location && `• ${exp.location}`}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </div>
                {exp.responsibilities && (
                  <div style={{
                    marginTop: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)',
                    whiteSpace: 'pre-wrap', lineHeight: 1.6,
                  }}>
                    {exp.responsibilities}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                <button className="btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                  onClick={() => handleEdit(i)}>
                  Edit
                </button>
                <button style={{
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#fca5a5', borderRadius: '0.5rem', padding: '0.375rem 0.75rem',
                  fontSize: '0.75rem', cursor: 'pointer',
                }} onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', payload: i })}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="card" style={{ borderColor: editIndex !== null ? 'rgba(99,102,241,0.3)' : undefined }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>
            {editIndex !== null ? '✏️ Edit Experience' : '➕ Add Experience'}
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}>
          <div>
            <label className="input-label">Job Title *</label>
            <input className="input-field" placeholder="Software Engineer"
              value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} />
          </div>
          <div>
            <label className="input-label">Company *</label>
            <input className="input-field" placeholder="Google"
              value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div>
            <label className="input-label">Location</label>
            <input className="input-field" placeholder="Mountain View, CA"
              value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div>
            <label className="input-label">Start Date</label>
            <input className="input-field" placeholder="Jan 2022" type="text"
              value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          </div>
          <div>
            <label className="input-label">End Date</label>
            <input className="input-field" placeholder="Dec 2024" type="text"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              disabled={form.current}
              style={form.current ? { opacity: 0.5 } : {}}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'end', paddingBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <input type="checkbox" checked={form.current}
                onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: '' })}
                style={{ accentColor: 'var(--primary)' }}
              />
              Currently working here
            </label>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
            <label className="input-label" style={{ marginBottom: 0 }}>Responsibilities & Achievements</label>
            <button className="btn-ai" onClick={enhanceBullets} disabled={loadingAI || !form.responsibilities.trim()}>
              {loadingAI ? '⚡ Enhancing...' : '🤖 Enhance with AI'}
            </button>
          </div>
          {aiMessage && (
            <div style={{
              padding: '0.5rem 0.75rem', borderRadius: '0.5rem', marginBottom: '0.5rem',
              fontSize: '0.75rem',
              background: aiMessage.includes('⚠️') ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)',
              color: aiMessage.includes('⚠️') ? '#fca5a5' : 'var(--primary-light)',
            }}>
              {aiMessage}
            </div>
          )}
          <textarea className="input-field" style={{ minHeight: '120px' }}
            placeholder="• Led development of microservices architecture...&#10;• Increased test coverage by 40%...&#10;• Mentored 3 junior developers..."
            value={form.responsibilities}
            onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button className="btn-primary" onClick={handleSubmit}>
            {editIndex !== null ? 'Update Experience' : '+ Add Experience'}
          </button>
          {editIndex !== null && (
            <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
          )}
        </div>
      </div>
    </div>
  );
}
