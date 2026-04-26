import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'fmcsa-explorer-demo-controls';

const DEFAULTS = {
  featureEnabled: true,
  isPaidUser: true,
  discrepancyPercent: 130,
};

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

const DemoControlsContext = createContext(null);

export function DemoControlsProvider({ children }) {
  const [state, setState] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota / privacy mode errors
    }
  }, [state]);

  const value = {
    ...state,
    setFeatureEnabled: (v) => setState((s) => ({ ...s, featureEnabled: v })),
    setIsPaidUser: (v) => setState((s) => ({ ...s, isPaidUser: v })),
    setDiscrepancyPercent: (v) => setState((s) => ({ ...s, discrepancyPercent: v })),
  };

  return (
    <DemoControlsContext.Provider value={value}>
      {children}
    </DemoControlsContext.Provider>
  );
}

export function useDemoControls() {
  const ctx = useContext(DemoControlsContext);
  if (!ctx) throw new Error('useDemoControls must be used within DemoControlsProvider');
  return ctx;
}
