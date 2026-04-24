'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useResume } from '@/context/ResumeContext';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import SummaryForm from '@/components/forms/SummaryForm';
import SkillsForm from '@/components/forms/SkillsForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import ProjectsForm from '@/components/forms/ProjectsForm';
import EducationForm from '@/components/forms/EducationForm';
import AdditionalForm from '@/components/forms/AdditionalForm';
import ResumePreview from '@/components/preview/ResumePreview';

const steps = [
  { id: 'personal', label: 'Personal', icon: '👤' },
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'skills', label: 'Skills', icon: '🛠️' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'additional', label: 'More', icon: '➕' },
];

const templates = [
  { id: 'minimal', label: 'Minimal', color: '#64748b' },
  { id: 'modern', label: 'Modern', color: '#6366f1' },
  { id: 'professional', label: 'Professional', color: '#0f766e' },
  { id: 'creative', label: 'Creative', color: '#ec4899' },
  { id: 'developer', label: 'Developer', color: '#22c55e' },
  { id: 'ats', label: 'ATS', color: '#f59e0b' },
];

export default function BuilderPage() {
  const { state, dispatch, aiGenerate } = useResume();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [atsLoading, setAtsLoading] = useState(false);

  const renderForm = () => {
    switch (steps[currentStep].id) {
      case 'personal': return <PersonalInfoForm />;
      case 'summary': return <SummaryForm />;
      case 'skills': return <SkillsForm />;
      case 'experience': return <ExperienceForm />;
      case 'projects': return <ProjectsForm />;
      case 'education': return <EducationForm />;
      case 'additional': return <AdditionalForm />;
      default: return null;
    }
  };

  const exportPDF = useCallback(async () => {
    setExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const el = document.getElementById('resume-preview');
      if (!el) { alert('Please preview your resume first'); setExporting(false); return; }
      await html2pdf().set({
        margin: 0, filename: `${state.personalInfo.fullName || 'Resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(el).save();
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Failed to export PDF. Please try again.');
    }
    setExporting(false);
  }, [state.personalInfo.fullName]);

  const runAtsCheck = async () => {
    setAtsLoading(true);
    try {
      const res = await aiGenerate('ats-score', { resumeData: state, targetRole: state.experience?.[0]?.jobTitle || '' });
      dispatch({ type: 'SET_ATS_SCORE', payload: res.result });
    } catch { dispatch({ type: 'SET_ATS_SCORE', payload: { score: 0, suggestions: ['Could not reach AI service.'] } }); }
    setAtsLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
      {/* Top Bar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 1.5rem', borderBottom: '1px solid rgba(148,163,184,0.08)',
        background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px', height: '32px', background: 'var(--gradient-primary)', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
          }}>📝</div>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>
            <span className="gradient-text">AI Resume</span>
          </span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
            onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? '✏️ Editor' : '👁️ Preview'}
          </button>
          <button className="btn-ai" style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
            onClick={runAtsCheck} disabled={atsLoading}>
            {atsLoading ? '⚡ Checking...' : '🎯 ATS Score'}
          </button>
          <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8125rem' }}
            onClick={() => { setShowPreview(true); setTimeout(exportPDF, 500); }} disabled={exporting}>
            {exporting ? '⏳ Exporting...' : '📄 Export PDF'}
          </button>
        </div>
      </nav>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 57px)' }}>
        {/* Sidebar Steps */}
        <aside style={{
          width: '200px', padding: '1rem 0.75rem', borderRight: '1px solid rgba(148,163,184,0.08)',
          display: 'flex', flexDirection: 'column', gap: '0.25rem', flexShrink: 0,
        }}>
          {steps.map((step, i) => (
            <button key={step.id} onClick={() => { setCurrentStep(i); setShowPreview(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.625rem 0.75rem', borderRadius: '0.625rem',
                background: currentStep === i ? 'rgba(99,102,241,0.1)' : 'transparent',
                border: currentStep === i ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
                color: currentStep === i ? 'var(--primary-light)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.8125rem', fontWeight: currentStep === i ? 600 : 400,
                transition: 'all 0.2s ease', textAlign: 'left', width: '100%',
              }}>
              <span style={{ fontSize: '1rem' }}>{step.icon}</span>
              {step.label}
            </button>
          ))}

          <div style={{ marginTop: 'auto', padding: '0.75rem' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Template</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem' }}>
              {templates.map((t) => (
                <button key={t.id} onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: t.id })}
                  style={{
                    padding: '0.375rem', borderRadius: '0.5rem', fontSize: '0.6875rem', cursor: 'pointer',
                    background: state.selectedTemplate === t.id ? `${t.color}22` : 'var(--surface)',
                    border: `1.5px solid ${state.selectedTemplate === t.id ? t.color : 'var(--surface-lighter)'}`,
                    color: state.selectedTemplate === t.id ? t.color : 'var(--text-muted)',
                    fontWeight: state.selectedTemplate === t.id ? 600 : 400,
                    transition: 'all 0.2s ease',
                  }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          {showPreview ? (
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* ATS Score */}
              {state.atsScore && (
                <div className="glass" style={{
                  width: '100%', maxWidth: '210mm', marginBottom: '1.5rem', borderRadius: '1rem', padding: '1.25rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '50px', height: '50px', borderRadius: '50%',
                      background: `conic-gradient(${state.atsScore.score >= 70 ? 'var(--success)' : state.atsScore.score >= 50 ? 'var(--warning)' : 'var(--danger)'} ${state.atsScore.score * 3.6}deg, var(--surface-lighter) 0deg)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                        {state.atsScore.score}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem' }}>ATS Compatibility Score</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                        {state.atsScore.score >= 70 ? '✅ Good score!' : state.atsScore.score >= 50 ? '⚠️ Needs improvement' : '❌ Low score'}
                      </div>
                    </div>
                  </div>
                  {state.atsScore.suggestions?.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {state.atsScore.suggestions.map((s, i) => (
                        <div key={i} style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', paddingLeft: '1rem', borderLeft: '2px solid var(--primary)', lineHeight: 1.5 }}>
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div style={{ transform: 'scale(0.75)', transformOrigin: 'top center' }}>
                <ResumePreview />
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
              {renderForm()}
              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(148,163,184,0.08)' }}>
                <button className="btn-secondary" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0} style={{ opacity: currentStep === 0 ? 0.3 : 1 }}>
                  ← Previous
                </button>
                {currentStep < steps.length - 1 ? (
                  <button className="btn-primary" onClick={() => setCurrentStep(currentStep + 1)}>
                    Next →
                  </button>
                ) : (
                  <button className="btn-primary" onClick={() => setShowPreview(true)}
                    style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
                    👁️ Preview Resume
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
