const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'focawear-collab';
const REPO  = 'quiborax-eerr';
const PATH  = 'acciones.json';
const API   = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

const ghHeaders = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  'User-Agent': 'quiborax-eerr-dashboard',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET: leer acciones desde GitHub ──────────────────────────
  if (req.method === 'GET') {
    try {
      const r = await fetch(API, { headers: ghHeaders });
      if (r.status === 404) return res.status(200).json([]);
      const data = await r.json();
      const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
      return res.status(200).json(content);
    } catch {
      return res.status(200).json([]);
    }
  }

  // ── POST: guardar acciones en GitHub ─────────────────────────
  if (req.method === 'POST') {
    try {
      // Obtener SHA actual (necesario para actualizar)
      let sha = null;
      const getR = await fetch(API, { headers: ghHeaders });
      if (getR.ok) {
        const d = await getR.json();
        sha = d.sha;
      }

      const body = {
        message: 'update: acciones pendientes dashboard EERR',
        content: Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64'),
        ...(sha && { sha }),
      };

      const putR = await fetch(API, {
        method: 'PUT',
        headers: ghHeaders,
        body: JSON.stringify(body),
      });

      if (putR.ok) return res.status(200).json({ ok: true });
      const err = await putR.json();
      return res.status(500).json({ error: err.message });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
