# Email Küldés Beállítása

A kapcsolatfelvételi űrlap jelenleg alapvetően működik, de az email küldéshez be kell állítani egy email szolgáltatást.

## Jelenleg

Az űrlap adatokat gyűjt és az API endpoint-ra küldi őket, de az emailek még nem kerülnek ténylegesen kiküldésre.

## Email Szolgáltatás Választás

Válassz egyet az alábbi szolgáltatások közül:

### 1. Resend (Ajánlott - Egyszerű és Modern)

```bash
npm install resend
```

Majd a `src/app/api/contact/route.ts` fájlban:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// A POST function-ben:
await resend.emails.send({
  from: 'Papirmania weboldal <onboarding@resend.dev>', // vagy saját domain
  to: 'darmos.marianna@gmail.com',
  subject: `Új üzenet: ${name}`,
  html: emailData.html,
});
```

API kulcs: https://resend.com/api-keys

### 2. SendGrid

```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

await sgMail.send({
  to: 'darmos.marianna@gmail.com',
  from: 'your-verified-sender@yourdomain.com',
  subject: `Új üzenet: ${name}`,
  html: emailData.html,
});
```

### 3. Nodemailer (Gmail SMTP)

```bash
npm install nodemailer
```

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // App password
  },
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'darmos.marianna@gmail.com',
  subject: `Új üzenet: ${name}`,
  html: emailData.html,
});
```

## Environment Variables

Hozz létre egy `.env.local` fájlt a projekt gyökér könyvtárában:

```env
# Resend esetén:
RESEND_API_KEY=your_api_key_here

# SendGrid esetén:
SENDGRID_API_KEY=your_api_key_here

# Nodemailer esetén:
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## Tesztelés

Az űrlap kitöltése után az email a `darmos.marianna@gmail.com` címre érkezik az alábbi formátumban:

**Tárgy:** Új üzenet: [Felhasználó neve]

**Tartalom:**
- Név
- Email
- Üzenet
