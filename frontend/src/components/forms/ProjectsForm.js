'use client';
import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';

const emptyProject = {
  title: '',
  description: '',
  technologies: '',
  githubLink: '',
  liveDemo: '',
};

export default function ProjectsForm() {
  const { state, dispatch } = useResume();
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(emptyProject);

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    if (editIndex !== null) {
      dispatch({ type: 'UPDATE_PROJECT', payload: { index: editIndex, data: form } });
      setEditIndex(null);
    } else {
      dispatch({ type: 'ADD_PROJECT', payload: form });
    }
    setForm(emptyProject);
  };

  const handleEdit = (index) => {
    setForm(state.projects[index]);
    setEditIndex(index);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
          Projects
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Showcase your best projects to demonstrate your skills.
        </p>
      </div>

      {state.projects.length > 0 && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {state.projects.map((proj, i) => (
            <div key={i} className="card" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{proj.title}</div>
                {proj.technologies && (
                  <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginTop: '0.375rem' }}>
                    {proj.technologies.split(',').map((tech, ti) => (
                      <span key={ti} style={{
                        fontSize: '0.6875rem', padding: '0.125rem 0.5rem',
                        background: 'rgba(99,102,241,0.1)', borderRadius: '100px',
                        color: 'var(--primary-light)',
                      }}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                {proj.description && (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginTop: '0.375rem', lineHeight: 1.5 }}>
                    {proj.description}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                <button className="btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                  onClick={() => handleEdit(i)}>Edit</button>
                <button style={{
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#fca5a5', borderRadius: '0.5rem', padding: '0.375rem 0.75rem',
                  fontSize: '0.75rem', cursor: 'pointer',
                }} onClick={() => dispatch({ type: 'REMOVE_PROJECT', payload: i })}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1rem' }}>
          {editIndex !== null ? '✏️ Edit Project' : '➕ Add Project'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="input-label">Project Title *</label>
            <input className="input-field" placeholder="E-Commerce Platform"
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="input-label">Description</label>
            <textarea className="input-field" placeholder="Built a full-stack e-commerce platform with real-time inventory management..."
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="input-label">Technologies (comma-separated)</label>
            <input className="input-field" placeholder="React, Node.js, MongoDB, Docker"
              value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} />
          </div>
          <div>
            <label className="input-label">GitHub Link</label>
            <input className="input-field" placeholder="https://github.com/..."
              value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} />
          </div>
          <div>
            <label className="input-label">Live Demo</label>
            <input className="input-field" placeholder="https://myproject.com"
              value={form.liveDemo} onChange={(e) => setForm({ ...form, liveDemo: e.target.value })} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button className="btn-primary" onClick={handleSubmit}>
            {editIndex !== null ? 'Update Project' : '+ Add Project'}
          </button>
          {editIndex !== null && (
            <button className="btn-secondary" onClick={() => { setForm(emptyProject); setEditIndex(null); }}>Cancel</button>
          )}
        </div>
      </div>
    </div>
  );
}
