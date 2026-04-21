import { useState, useCallback } from 'react';

async function fmcsaFetch(path) {
  const res = await fetch(`/api/fmcsa?path=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function extractCarrier(res) {
  const c = res?.content;
  if (!c) return null;
  if (Array.isArray(c)) return c[0]?.carrier ?? c[0] ?? null;
  if (c.carrier) return c.carrier;
  return c;
}

function parseNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeBasics(res) {
  const c = res?.content;
  if (!c) return null;
  const items = Array.isArray(c) ? c : Array.isArray(c.basics) ? c.basics : null;
  if (!items) return null;

  return items.map((item) => {
    const b = item.basic ?? item;
    const typeObj = b.basicsType ?? {};
    const typeLabel =
      typeObj.basicsShortDesc ??
      typeObj.basicsCode ??
      (typeof b.basicsType === 'string' ? b.basicsType : null);

    const rawPercentile = b.basicsPercentile ?? b.percentile ?? null;
    const isNotPublic =
      typeof rawPercentile === 'string' && /not\s*public/i.test(rawPercentile);
    const percentile = isNotPublic ? null : parseNumber(rawPercentile);

    return {
      typeLabel,
      percentile,
      notPublic: isNotPublic,
      measureValue: parseNumber(b.measureValue),
      violationThreshold: parseNumber(b.basicsViolationThreshold),
      totalViolations: parseNumber(b.totalViolation),
      inspectionsWithViolations: parseNumber(b.totalInspectionWithViolation),
      exceededThreshold: b.exceededFMCSAInterventionThreshold === 'Y',
      runDate: b.basicsRunDate ?? null,
    };
  });
}

export default function useCarrier() {
  const [state, setState] = useState({
    carrier: null,
    basics: null,
    loading: false,
    error: null,
    dotNumber: null,
  });

  const lookup = useCallback(async (dotNumber) => {
    setState((s) => ({ ...s, loading: true, error: null, dotNumber }));
    try {
      const [carrierRes, basicsRes] = await Promise.all([
        fmcsaFetch(`/carriers/${dotNumber}`),
        fmcsaFetch(`/carriers/${dotNumber}/basics`),
      ]);
      const carrier = extractCarrier(carrierRes);
      const basics = normalizeBasics(basicsRes);
      setState({ carrier, basics, loading: false, error: null, dotNumber });
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: err.message }));
    }
  }, []);

  return { ...state, lookup };
}
