import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '32kb' }));
app.use(express.static(path.join(__dirname, 'public')));

const businessContext = `
You are the website assistant for AB Fencing, a family-run fencing business based in Wallington, Surrey, serving Wallington and surrounding Surrey/South London areas.
Public business information: over 20 years of fencing-industry experience; fencing installation and repairs; landscaping-related services including decking, patios, paving/driveways, turfing, artificial grass, hard/soft landscaping, site clearance and security fencing.
Phone: 07539 490180.
Hours published online: Monday-Friday 08:00-17:00, Saturday 09:00-13:00, Sunday closed. Treat these as published hours and suggest calling to confirm.
Do not invent prices, availability, guarantees, qualifications, materials, addresses, or services not stated above.
The supplied website images are brand/signage artwork, not evidence of completed customer projects.
For quotes or site-specific questions, encourage the visitor to call AB Fencing or use the quote form.
Keep replies concise, helpful, friendly and professional. Never claim to be human.
`;

app.post('/api/assistant', async (req, res) => {
  try {
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    const history = Array.isArray(req.body?.history) ? req.body.history.slice(-8) : [];
    if (!message) return res.status(400).json({ error: 'Please enter a message.' });

    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        answer: "I’m the AB Fencing website assistant. I can help with services, areas covered and arranging a quote. For the quickest response, call 07539 490180. AI chat is not connected until the site owner adds an OPENAI_API_KEY to Railway."
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const transcript = history
      .filter(x => x && (x.role === 'user' || x.role === 'assistant') && typeof x.content === 'string')
      .map(x => ({ role: x.role, content: x.content }))
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
    console.error(error);
    res.status(500).json({ error: 'The assistant is temporarily unavailable. Please call 07539 490180.' });
  }
});

app.post('/api/quote', (req, res) => {
  const { name, phone, email, service, message } = req.body || {};
  if (!name || !phone || !message) return res.status(400).json({ error: 'Name, phone and project details are required.' });
  console.log('QUOTE REQUEST', { name, phone, email, service, message, receivedAt: new Date().toISOString() });
  res.json({ ok: true, message: 'Thanks — your enquiry has been captured. Please call 07539 490180 as well if your project is urgent.' });
});

app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, '0.0.0.0', () => console.log(`AB Fencing site listening on ${port}`));
