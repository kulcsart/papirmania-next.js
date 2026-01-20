'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type TemplateMode = 'light' | 'dark';

interface TemplateContextValue {
  template: TemplateMode;
  setTemplate: (template: TemplateMode) => void;
  toggleTemplate: () => void;
}

const TemplateContext = createContext<TemplateContextValue | undefined>(undefined);

const TEMPLATE_STORAGE_KEY = 'papirmania-template';

export const TemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [template, setTemplateState] = useState<TemplateMode>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      setTemplateState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.template = template;
    window.localStorage.setItem(TEMPLATE_STORAGE_KEY, template);
  }, [template]);

  const setTemplate = (next: TemplateMode) => {
    setTemplateState(next);
  };

  const toggleTemplate = () => {
    setTemplateState((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(
    () => ({
      template,
      setTemplate,
      toggleTemplate,
    }),
    [template]
  );

  return (
    <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within TemplateProvider');
  }
  return context;
};

export default TemplateProvider;
