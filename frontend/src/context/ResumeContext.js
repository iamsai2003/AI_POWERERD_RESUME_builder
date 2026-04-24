'use client';
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const initialState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: '',
  skills: [],
  experience: [],
  projects: [],
  education: [],
  certifications: [],
  achievements: [],
  languages: [],
  customSections: [],
  selectedTemplate: 'modern',
  atsScore: null,
};

function resumeReducer(state, action) {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case 'SET_SUMMARY':
      return { ...state, summary: action.payload };
    case 'SET_SKILLS':
      return { ...state, skills: action.payload };
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] };
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter((_, i) => i !== action.payload) };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map((s, i) => (i === action.payload.index ? { ...s, ...action.payload.data } : s)),
      };
    case 'SET_EXPERIENCE':
      return { ...state, experience: action.payload };
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((e, i) => (i === action.payload.index ? { ...e, ...action.payload.data } : e)),
      };
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter((_, i) => i !== action.payload) };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p, i) => (i === action.payload.index ? { ...p, ...action.payload.data } : p)),
      };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((_, i) => i !== action.payload) };
    case 'SET_EDUCATION':
      return { ...state, education: action.payload };
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((e, i) => (i === action.payload.index ? { ...e, ...action.payload.data } : e)),
      };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((_, i) => i !== action.payload) };
    case 'SET_CERTIFICATIONS':
      return { ...state, certifications: action.payload };
    case 'ADD_CERTIFICATION':
      return { ...state, certifications: [...state.certifications, action.payload] };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map((c, i) => (i === action.payload.index ? { ...c, ...action.payload.data } : c)),
      };
    case 'REMOVE_CERTIFICATION':
      return { ...state, certifications: state.certifications.filter((_, i) => i !== action.payload) };
    case 'SET_ACHIEVEMENTS':
      return { ...state, achievements: action.payload };
    case 'ADD_ACHIEVEMENT':
      return { ...state, achievements: [...state.achievements, action.payload] };
    case 'UPDATE_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map((a, i) => (i === action.payload.index ? { ...a, ...action.payload.data } : a)),
      };
    case 'REMOVE_ACHIEVEMENT':
      return { ...state, achievements: state.achievements.filter((_, i) => i !== action.payload) };
    case 'SET_LANGUAGES':
      return { ...state, languages: action.payload };
    case 'ADD_LANGUAGE':
      return { ...state, languages: [...state.languages, action.payload] };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map((l, i) => (i === action.payload.index ? { ...l, ...action.payload.data } : l)),
      };
    case 'REMOVE_LANGUAGE':
      return { ...state, languages: state.languages.filter((_, i) => i !== action.payload) };
    case 'SET_CUSTOM_SECTIONS':
      return { ...state, customSections: action.payload };
    case 'ADD_CUSTOM_SECTION':
      return { ...state, customSections: [...state.customSections, action.payload] };
    case 'UPDATE_CUSTOM_SECTION':
      return {
        ...state,
        customSections: state.customSections.map((s, i) => (i === action.payload.index ? { ...s, ...action.payload.data } : s)),
      };
    case 'REMOVE_CUSTOM_SECTION':
      return { ...state, customSections: state.customSections.filter((_, i) => i !== action.payload) };
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'SET_ATS_SCORE':
      return { ...state, atsScore: action.payload };
    case 'LOAD_STATE':
      return { ...initialState, ...action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai-resume-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      }
    } catch (e) {
      console.warn('Failed to load saved resume data:', e);
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai-resume-data', JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save resume data:', e);
    }
  }, [state]);

  const aiGenerate = useCallback(async (action, data) => {
    try {
      const res = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data }),
      });
      if (!res.ok) throw new Error('AI request failed');
      const json = await res.json();
      return json;
    } catch (error) {
      console.error('AI generation error:', error);
      throw error;
    }
  }, []);

  return (
    <ResumeContext.Provider value={{ state, dispatch, aiGenerate }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
}
