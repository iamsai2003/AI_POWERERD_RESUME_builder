'use client';
import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';

const categories = ['Programming Languages', 'Frameworks', 'Tools', 'Soft Skills', 'Other'];
const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function SkillsForm() {
  const { state, dispatch, aiGenerate } = useResume();
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Programming Languages', proficiency: 'Intermediate' });
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    dispatch({ type: 'ADD_SKILL', payload: { ...newSkill, name: newSkill.name.trim() } });
    setNewSkill({ ...newSkill, name: '' });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestSkills = async () => {
    setLoading(true);
    setAiMessage('');
    try {
      const role = state.experience?.[0]?.jobTitle || 'Software Developer';
      const res = await aiGenerate('suggest-skills', {
        role,
        currentSkills: state.skills.map(s => s.name),
        experienceLevel: state.experience?.length > 2 ? 'Senior' : 'Mid-level',
      });
      const suggestions = Array.isArray(res.result) ? res.result : [];
      suggestions.forEach((skill) => {
        if (!state.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())) {
          dispatch({
            type: 'ADD_SKILL',
            payload: { name: skill, category: 'Other', proficiency: 'Intermediate' },
          });
        }
      });
      setAiMessage(`✨ Added ${suggestions.length} suggested skills!`);
    } catch {
      setAiMessage('⚠️ Could not reach AI service.');
    }
    setLoading(false);
  };

  const groupedSkills = categories.reduce((acc, cat) => {
    acc[cat] = state.skills.filter(s => s.category === cat);
    return acc;
  }, {});

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
              Skills
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Add your skills categorized by type.
            </p>
          </div>
          <button className="btn-ai" onClick={suggestSkills} disabled={loading}>
            {loading ? '⚡ Suggesting...' : '🤖 AI Suggest Skills'}
          </button>
        </div>
      </div>

      {aiMessage && (
        <div style={{
          padding: '0.75rem 1rem', borderRadius: '0.75rem', marginBottom: '1rem',
          fontSize: '0.8125rem',
          background: aiMessage.includes('⚠️') ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)',
          border: `1px solid ${aiMessage.includes('⚠️') ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)'}`,
          color: aiMessage.includes('⚠️') ? '#fca5a5' : 'var(--primary-light)',
        }}>
          {aiMessage}
        </div>
      )}

      {/* Add Skill Form */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto',
          gap: '0.75rem',
          alignItems: 'end',
        }}>
          <div>
            <label className="input-label">Skill Name</label>
            <input
              className="input-field"
              placeholder="e.g., React, Python, Leadership"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <label className="input-label">Category</label>
            <select
              className="input-field"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              style={{ cursor: 'pointer' }}
            >
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="input-label">Proficiency</label>
            <select
              className="input-field"
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
              style={{ cursor: 'pointer' }}
            >
              {proficiencyLevels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <button className="btn-primary" onClick={addSkill} style={{ height: '42px' }}>
            + Add
          </button>
        </div>
      </div>

      {/* Skills Display */}
      {Object.entries(groupedSkills).map(([category, skills]) => {
        if (skills.length === 0) return null;
        return (
          <div key={category} style={{ marginBottom: '1.25rem' }}>
            <h3 style={{
              fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}>
              {category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((skill, idx) => {
                const globalIdx = state.skills.indexOf(skill);
                const profColors = {
                  Beginner: '#64748b',
                  Intermediate: '#6366f1',
                  Advanced: '#06b6d4',
                  Expert: '#10b981',
                };
                return (
                  <div key={idx} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'var(--surface)',
                    border: `1px solid ${profColors[skill.proficiency]}33`,
                    borderRadius: '100px',
                    padding: '0.375rem 0.625rem 0.375rem 0.875rem',
                    fontSize: '0.8125rem',
                    transition: 'all 0.2s ease',
                  }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: profColors[skill.proficiency],
                    }} />
                    <span>{skill.name}</span>
                    <span style={{
                      fontSize: '0.6875rem', color: 'var(--text-muted)',
                      borderLeft: '1px solid var(--surface-lighter)',
                      paddingLeft: '0.5rem',
                    }}>
                      {skill.proficiency}
                    </span>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_SKILL', payload: globalIdx })}
                      style={{
                        background: 'none', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer', padding: '0 0.125rem', fontSize: '1rem',
                        lineHeight: 1,
                      }}
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {state.skills.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '2rem',
          color: 'var(--text-muted)', fontSize: '0.875rem',
        }}>
          No skills added yet. Start typing above or use AI to suggest skills.
        </div>
      )}
    </div>
  );
}
