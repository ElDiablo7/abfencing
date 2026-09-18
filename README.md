# AB Fencing Website + Lead System

Railway-ready Node/Express website for AB Fencing, serving Wallington, Surrey and surrounding areas.

## Included

- Premium navy / electric-blue visual system based on the supplied AB Fencing signage.
- Responsive marketing website with services, customer feedback, click-to-call CTAs and enquiry form.
- AB-branded artwork in `public/assets/`.
- AI website assistant at `/api/assistant` using the OpenAI Responses API when `OPENAI_API_KEY` is configured.
- Lead capture at `/api/quote`.
- Optional Resend email delivery and optional CRM/webhook delivery.
- Privacy notice and consent prompt.
- Rate limiting for assistant and enquiry endpoints.
- SEO metadata, structured business data, robots.txt and dynamic sitemap.
- Railway start configuration and GitHub Actions CI validation.

## Verified public business information used in the site

Public listings describe AB Fencing as a family-run fencing and landscaping business serving Wallington and surrounding areas, with over 20 years' fencing-industry experience. Published service categories include fencing, repairs, artificial grass, block paving, decking, hard/soft landscaping, lawns, patios, paving/driveways, security fencing, site clearance, slabbing and turfing.

## Local run

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## AI assistant

Set in Railway:

- `OPENAI_API_KEY`
- `OPENAI_MODEL=gpt-5.6-luna`

The key is server-side only. The assistant is instructed not to invent prices, availability, guarantees or other unsupported claims.

## Lead delivery

The form always logs the enquiry server-side. For production notification, set:

- `RESEND_API_KEY`
- `RESEND_FROM`
- `LEAD_EMAIL`

Alternatively set `LEAD_WEBHOOK_URL` to a lead/CRM webhook. If either email or webhook delivery succeeds, the visitor receives a confirmed sent message.

## Railway

Connect this GitHub repository to Railway and deploy the `main` branch. The project uses `npm start` and includes a Railway configuration plus CI checks.

## Supplied raster images

The two supplied raster images are available in the working conversation files. The repository currently uses committed AB-branded SVG artwork because the GitHub text connector cannot upload binary conversation attachments directly. The website asset paths are structured so the supplied PNG/WebP artwork can replace those SVGs without changing the layout.

## Production checklist

1. Add OpenAI key in Railway.
2. Add Resend credentials and destination email, or a CRM webhook.
3. Replace the committed placeholder/brand artwork with the supplied raster files if binary Git upload is enabled.
4. Confirm the final business contact/privacy details before public launch.
