'use client';
import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';

export default function SummaryForm() {
  const { state, dispatch, aiGenerate } = useResume();
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  const handleGenerateSummary = async () => {
    setLoading(true);
    setAiMessage('');
    try {
      const res = await aiGenerate('generate-summary', {
        personalInfo: state.personalInfo,
        skills: state.skills,
        experience: state.experience,
        education: state.education,
      });
      dispatch({ type: 'SET_SUMMARY', payload: res.result });
      if (res.fallback) {
        setAiMessage('💡 AI service unavailable. Showing a suggested summary — feel free to customize it!');
      } else {
        setAiMessage('✨ Summary generated successfully!');
      }
    } catch {
      setAiMessage('⚠️ Could not reach AI service. Please check if the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
              Professional Summary
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Write a compelling summary or let AI generate one for you.
            </p>
          </div>
          <button
            className="btn-ai"
            onClick={handleGenerateSummary}
            disabled={loading}
            style={{ fontSize: '0.8125rem', padding: '0.625rem 1.25rem' }}
          >
            {loading ? (
              <>
                <span style={{ display: 'inline-block', animation: 'float 1s ease-in-out infinite' }}>⚡</span>
                Generating...
              </>
            ) : (
              <>🤖 Generate with AI</>
            )}
          </button>
        </div>
      </div>

      {aiMessage && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.75rem',
          marginBottom: '1rem',
          fontSize: '0.8125rem',
          background: aiMessage.includes('⚠️') ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)',
          border: `1px solid ${aiMessage.includes('⚠️') ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)'}`,
          color: aiMessage.includes('⚠️') ? '#fca5a5' : 'var(--primary-light)',
        }}>
          {aiMessage}
        </div>
      )}

      <textarea
        id="summary-text"
        className="input-field"
        style={{ minHeight: '150px' }}
        placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
        value={state.summary}
        onChange={(e) => dispatch({ type: 'SET_SUMMARY', payload: e.target.value })}
      />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
        💡 Tip: Fill in your skills and experience first, then use AI to generate a tailored summary.
      </p>
    </div>
  );
}
