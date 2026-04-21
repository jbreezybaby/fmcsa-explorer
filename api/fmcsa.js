const FMCSA_BASE = 'https://mobile.fmcsa.dot.gov/qc/services';

export default async function handler(req, res) {
  const { path } = req.query;
  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  const apiKey = process.env.FMCSA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'FMCSA_API_KEY not configured' });
  }

  const url = `${FMCSA_BASE}${path}?webKey=${apiKey}`;
  try {
    const upstream = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach FMCSA API', detail: err.message });
  }
}
