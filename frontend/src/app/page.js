'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Content',
    desc: 'Transform raw input into polished, professional resume content with advanced AI.',
  },
  {
    icon: '🎯',
    title: 'ATS Optimized',
    desc: 'Get real-time ATS scoring and keyword suggestions to beat applicant tracking systems.',
  },
  {
    icon: '🎨',
    title: '6 Premium Templates',
    desc: 'Choose from Minimal, Modern, Professional, Creative, Developer, and ATS-focused designs.',
  },
  {
    icon: '📄',
    title: 'Instant PDF Export',
    desc: 'Download your resume as a perfectly formatted PDF with one click.',
  },
  {
    icon: '✨',
    title: 'Smart Enhancement',
    desc: 'AI bullet point enhancement turns responsibilities into achievement-based statements.',
  },
  {
    icon: '💾',
    title: 'Auto-Save',
    desc: 'Your progress is automatically saved. Come back anytime to continue editing.',
  },
];

const templates = [
  { name: 'Minimal', color: '#64748b', desc: 'Clean & simple' },
  { name: 'Modern', color: '#6366f1', desc: 'Sleek & contemporary' },
  { name: 'Professional', color: '#0f766e', desc: 'Corporate ready' },
  { name: 'Creative', color: '#ec4899', desc: 'Stand out bold' },
  { name: 'Developer', color: '#22c55e', desc: 'Tech-focused' },
  { name: 'ATS-Optimized', color: '#f59e0b', desc: 'Maximum compatibility' },
];

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-200px', right: '-100px',
          animation: 'float 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-100px', left: '-100px',
          animation: 'float 8s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '40%', left: '50%',
          animation: 'float 7s ease-in-out infinite',
        }} />
      </div>

      {/* Spotlight effect following mouse */}
      {mounted && (
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.04), transparent 40%)`,
          transition: 'background 0.3s ease',
        }} />
      )}

      {/* Navigation */}
      <nav style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        maxWidth: '1400px', margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px', height: '40px',
            background: 'var(--gradient-primary)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem',
            boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
          }}>
            📝
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            <span className="gradient-text">AI Resume</span> Builder
          </span>
        </div>
        <Link href="/builder" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.9375rem' }}>
            Start Building →
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative', zIndex: 5,
        maxWidth: '1200px', margin: '0 auto',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
      }}>
        <div className={mounted ? 'animate-fade-in' : ''} style={{ opacity: mounted ? undefined : 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '100px',
            padding: '0.5rem 1.25rem',
            fontSize: '0.8125rem', fontWeight: 500,
            color: 'var(--primary-light)',
            marginBottom: '2rem',
          }}>
            ✨ AI-Powered Resume Generation
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}>
            Build Your Perfect Resume
            <br />
            <span className="gradient-text">in Minutes, Not Hours</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '640px', margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}>
            Harness the power of AI to create professional, ATS-optimized resumes.
            Choose from 6 stunning templates, enhance your content with AI, and export as PDF.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/builder" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{
                padding: '1rem 2.5rem',
                fontSize: '1.0625rem',
                borderRadius: '1rem',
              }}>
                🚀 Create My Resume
              </button>
            </Link>
            <a href="#features" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{
                padding: '1rem 2.5rem',
                fontSize: '1.0625rem',
                borderRadius: '1rem',
              }}>
                Learn More ↓
              </button>
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '3rem',
            marginTop: '4rem', flexWrap: 'wrap',
          }}>
            {[
              { value: '6', label: 'Templates' },
              { value: 'AI', label: 'Enhanced' },
              { value: 'ATS', label: 'Optimized' },
              { value: 'PDF', label: 'Export' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>{stat.value}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        position: 'relative', zIndex: 5,
        maxWidth: '1200px', margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Everything You Need
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            Powerful features to help you land your dream job
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{
              cursor: 'default',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(148,163,184,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates Preview */}
      <section style={{
        position: 'relative', zIndex: 5,
        maxWidth: '1200px', margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            6 Professional Templates
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            From minimal to creative — find the perfect style for your career
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}>
          {templates.map((t, i) => (
            <div key={i} style={{
              background: 'var(--surface-light)',
              border: '1px solid rgba(148,163,184,0.08)',
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = t.color;
                e.currentTarget.style.boxShadow = `0 8px 30px ${t.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(148,163,184,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '60px', height: '80px',
                background: `linear-gradient(135deg, ${t.color}22, ${t.color}11)`,
                border: `2px solid ${t.color}44`,
                borderRadius: '0.5rem',
                margin: '0 auto 1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: '30px', height: '4px',
                  background: t.color,
                  borderRadius: '2px',
                }} />
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{t.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        position: 'relative', zIndex: 5,
        maxWidth: '800px', margin: '0 auto',
        padding: '4rem 2rem 6rem',
        textAlign: 'center',
      }}>
        <div className="glass" style={{
          borderRadius: '1.5rem',
          padding: '3rem 2rem',
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Ready to Build Your Resume?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem' }}>
            It only takes a few minutes. Start now and let AI do the heavy lifting.
          </p>
          <Link href="/builder" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{
              padding: '1rem 3rem',
              fontSize: '1.0625rem',
              borderRadius: '1rem',
            }}>
              🚀 Start Building — It&apos;s Free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        position: 'relative', zIndex: 5,
        textAlign: 'center',
        padding: '2rem',
        borderTop: '1px solid rgba(148,163,184,0.08)',
        color: 'var(--text-muted)',
        fontSize: '0.8125rem',
      }}>
        <p>© {new Date().getFullYear()} AI Resume Builder. Built with ❤️ and AI.</p>
      </footer>
    </div>
  );
}
