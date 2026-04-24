'use client';
import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';

const emptyEducation = { degree: '', institution: '', year: '', gpa: '' };

export default function EducationForm() {
  const { state, dispatch } = useResume();
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(emptyEducation);

  const handleSubmit = () => {
    if (!form.degree.trim() || !form.institution.trim()) return;
    if (editIndex !== null) {
      dispatch({ type: 'UPDATE_EDUCATION', payload: { index: editIndex, data: form } });
      setEditIndex(null);
    } else {
      dispatch({ type: 'ADD_EDUCATION', payload: form });
    }
    setForm(emptyEducation);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>Education</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Add your educational background.</p>
      </div>

      {state.education.length > 0 && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {state.education.map((edu, i) => (
            <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{edu.degree}</div>
                <div style={{ color: 'var(--primary-light)', fontSize: '0.875rem' }}>{edu.institution}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                  {edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                  onClick={() => { setForm(state.education[i]); setEditIndex(i); }}>Edit</button>
                <button style={{
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#fca5a5', borderRadius: '0.5rem', padding: '0.375rem 0.75rem',
                  fontSize: '0.75rem', cursor: 'pointer',
                }} onClick={() => dispatch({ type: 'REMOVE_EDUCATION', payload: i })}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1rem' }}>
          {editIndex !== null ? '✏️ Edit Education' : '➕ Add Education'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div>
            <label className="input-label">Degree *</label>
            <input className="input-field" placeholder="B.Tech in Computer Science"
              value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} />
          </div>
          <div>
            <label className="input-label">Institution *</label>
            <input className="input-field" placeholder="MIT"
              value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
          </div>
          <div>
            <label className="input-label">Year</label>
            <input className="input-field" placeholder="2020 - 2024"
              value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          </div>
          <div>
            <label className="input-label">CGPA / Percentage</label>
            <input className="input-field" placeholder="9.2 / 10"
              value={form.gpa} onChange={(e) => setForm({ ...form, gpa: e.target.value })} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button className="btn-primary" onClick={handleSubmit}>
            {editIndex !== null ? 'Update' : '+ Add Education'}
          </button>
          {editIndex !== null && (
            <button className="btn-secondary" onClick={() => { setForm(emptyEducation); setEditIndex(null); }}>Cancel</button>
          )}
        </div>
      </div>
    </div>
  );
}
