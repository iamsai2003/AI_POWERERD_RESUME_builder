'use client';
import { useResume } from '@/context/ResumeContext';

export default function PersonalInfoForm() {
  const { state, dispatch } = useResume();
  const { personalInfo } = state;

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_PERSONAL_INFO', payload: { [field]: value } });
  };

  const fields = [
    { key: 'fullName', label: 'Full Name', placeholder: 'John Doe', type: 'text', required: true },
    { key: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email', required: true },
    { key: 'phone', label: 'Phone Number', placeholder: '+1 (555) 123-4567', type: 'tel' },
    { key: 'location', label: 'Location', placeholder: 'San Francisco, CA', type: 'text' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/johndoe', type: 'url' },
    { key: 'github', label: 'GitHub', placeholder: 'github.com/johndoe', type: 'url' },
    { key: 'portfolio', label: 'Portfolio / Website', placeholder: 'johndoe.dev', type: 'url' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
          Personal Information
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Let&apos;s start with the basics. This information will appear at the top of your resume.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
      }}>
        {fields.map((field) => (
          <div key={field.key}>
            <label className="input-label" htmlFor={`personal-${field.key}`}>
              {field.label} {field.required && <span style={{ color: 'var(--danger)' }}>*</span>}
            </label>
            <input
              id={`personal-${field.key}`}
              className="input-field"
              type={field.type}
              placeholder={field.placeholder}
              value={personalInfo[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
