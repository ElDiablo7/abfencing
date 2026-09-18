import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 3000);
const rate = new Map();

app.use(express.json({ limit: '32kb' }));
app.use(express.static(path.join(__dirname, 'public')));

const businessContext = `
You are the AB Fencing website assistant.
Business: AB Fencing, a family-run fencing and landscaping business serving Wallington, Surrey and surrounding areas.
Published business information: over 20 years' experience in the fencing industry; fencing installation and repairs; landscaping services including artificial grass, block paving, decking, hard landscaping, lawns, patios, paving/driveways, security fencing, seeding, site clearance, slabbing, soft landscaping and turfing.
Phone: 07539 490180.
Do not invent prices, availability, guarantees, qualifications, materials, addresses, or services.
If asked for a quote, help the visitor describe the job and then direct them to the quote form or phone.
For a useful enquiry, naturally ask for any missing essentials: postcode/area, project type, approximate number/length of panels, access issues, desired timeframe, and whether they have photos.
Be concise, friendly and professional. Never claim to be human.
`;

function allowed(req, key) {
  const now = Date.now();
  const previous = rate.get(key) || 0;
  if (now - previous < 1200) return false;
  rate.set(key, now);
  if (rate.size > 5000) for (const [k, v] of rate) if (now - v > 3600000) rate.delete(k);
  return true;
}

app.post('/api/assistant', async (req, res) => {
  try {
    if (!allowed(req, `assistant:${req.ip}`)) return res.status(429).json({ error: 'Please wait a moment and try again.' });
    const message = typeof req.body?.message === 'string' ? req.body.message.trim().slice(0, 2000) : '';
    const history = Array.isArray(req.body?.history) ? req.body.history.slice(-8) : [];
    if (!message) return res.status(400).json({ error: 'Please enter a message.' });

    if (!process.env.OPENAI_API_KEY) {
      return res.json({ answer: 'I can help with AB Fencing services and your project. For a quote or anything site-specific, call 07539 490180 or use the enquiry form below.' });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const transcript = history
      .filter(x => x && (x.role === 'user' || x.role === 'assistant') && typeof x.content === 'string')
      .map(x => ({ role: x.role, content: x.content.slice(0, 2000) }))
      .concat({ role: 'user', content: message });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      instructions: businessContext,
      input: transcript,
      max_output_tokens: 500,
      store: false
    });

    res.json({ answer: response.output_text || 'Please call AB Fencing on 07539 490180 for help with your enquiry.' });
  } catch (error) {
    console.error('AI assistant error', error);
    res.status(500).json({ error: 'The assistant is temporarily unavailable. Please call 07539 490180.' });
  }
});

async function sendLeadEmail(lead) {
  if (!process.env.RESEND_API_KEY || !process.env.LEAD_EMAIL || !process.env.RESEND_FROM) return false;
  const body = [
    'New AB Fencing website enquiry',
    '',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || 'Not supplied'}`,
    `Service: ${lead.service || 'Not specified'}`,
    `Postcode / area: ${lead.postcode || 'Not supplied'}`,
    '',
    'Project details:',
    lead.message
  ].join('\\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM,
      to: [process.env.LEAD_EMAIL],
      reply_to: lead.email || undefined,
      subject: `New AB Fencing enquiry — ${lead.service || 'Website lead'}`,
      text: body
    })
  });
  return response.ok;
}

async function sendLeadWebhook(lead) {
  if (!process.env.LEAD_WEBHOOK_URL) return false;
  const response = await fetch(process.env.LEAD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'ab-fencing-website', receivedAt: new Date().toISOString(), ...lead })
  });
  return response.ok;
}

app.post('/api/quote', async (req, res) => {
  try {
    if (!allowed(req, `quote:${req.ip}`)) return res.status(429).json({ error: 'Please wait a moment and try again.' });
    const lead = {
      name: typeof req.body?.name === 'string' ? req.body.name.trim().slice(0, 120) : '',
      phone: typeof req.body?.phone === 'string' ? req.body.phone.trim().slice(0, 60) : '',
      email: typeof req.body?.email === 'string' ? req.body.email.trim().slice(0, 160) : '',
      service: typeof req.body?.service === 'string' ? req.body.service.trim().slice(0, 100) : '',
      postcode: typeof req.body?.postcode === 'string' ? req.body.postcode.trim().slice(0, 30) : '',
      message: typeof req.body?.message === 'string' ? req.body.message.trim().slice(0, 4000) : ''
    };
    if (!lead.name || !lead.phone || !lead.message) return res.status(400).json({ error: 'Name, phone and project details are required.' });

    console.log('QUOTE REQUEST', { ...lead, receivedAt: new Date().toISOString() });
    const [emailed, webhooked] = await Promise.allSettled([sendLeadEmail(lead), sendLeadWebhook(lead)]);
    const delivered = emailed.value === true || webhooked.value === true;
    res.json({
      ok: true,
      delivered,
      message: delivered
        ? 'Thanks — your enquiry has been sent to AB Fencing. We’ll be in touch.'
        : 'Thanks — your enquiry has been captured. Please call 07539 490180 as well if your project is urgent.'
    });
  } catch (error) {
    console.error('Lead capture error', error);
    res.status(500).json({ error: 'We could not send the enquiry right now. Please call 07539 490180.' });
  }
});

app.get('/privacy', (req, res) => res.sendFile(path.join(__dirname, 'public', 'privacy.html')));
app.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'public', 'robots.txt')));
app.get('/sitemap.xml', (req, res) => {
  const origin = `${req.protocol}://${req.get('host')}`;
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`);
});
app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, '0.0.0.0', () => console.log(`AB Fencing site listening on ${port}`));
