# AB Fencing Website

A Railway-ready Node/Express website for AB Fencing, Wallington & surrounding Surrey areas.

## Included
- AB Fencing navy / electric-blue visual system based on supplied signage artwork.
- AB-branded artwork in `public/assets/`.
- Responsive marketing site with services, customer feedback, quote enquiry form and click-to-call CTAs.
- AI website assistant at `/api/assistant` using the OpenAI Responses API when `OPENAI_API_KEY` is configured.
- Graceful fallback message when AI credentials are not configured.
- Railway start configuration and healthcheck.

## Local run
```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## AI assistant
Set these environment variables in Railway:
- `OPENAI_API_KEY` — server-side only; never expose it in browser code.
- `OPENAI_MODEL` — defaults to `gpt-5.6-luna` in this project.

## Quote form
The quote endpoint currently logs enquiries to the service console and returns a success message. Before production, connect it to the owner's preferred lead destination (email/CRM/database) and add spam protection.

## Railway
Railway can detect a Node app and use `npm start`; `railway.json` explicitly sets the command and healthcheck. Connect the GitHub repository to a Railway service and deploy the `main` branch.
