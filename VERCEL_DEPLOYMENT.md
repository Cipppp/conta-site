# 🚀 Ghid Deployment pe Vercel

Acest ghid te va ajuta să publici site-ul de contabilitate pe Vercel în câțiva pași simpli.

## Pregătiri înainte de deployment

### 1. Verifică că totul funcționează local

```bash
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000) și verifică că:
- ✅ Toate paginile se încarcă corect
- ✅ Calculator-ul funcționează
- ✅ Butonul WhatsApp funcționează
- ✅ Link-urile de navigare sunt corecte

### 2. Build local (opțional dar recomandat)

```bash
npm run build
```

Dacă build-ul reușește fără erori, înseamnă că site-ul este gata pentru deployment.

---

## Deployment pe Vercel

### Opțiunea 1: Deployment cu GitHub (Recomandat) ✅

#### Pas 1: Push la GitHub

Dacă nu ai făcut deja commit și push:

```bash
# Verifică status
git status

# Adaugă toate fișierele modificate
git add .

# Creează commit
git commit -m "Prepare site for deployment"

# Push la GitHub
git push origin main
```

#### Pas 2: Creează cont Vercel

1. Mergi la [vercel.com](https://vercel.com)
2. Click pe **"Sign Up"**
3. Alege **"Continue with GitHub"**
4. Autorizează Vercel să acceseze GitHub-ul tău

#### Pas 3: Importă proiectul

1. În dashboard Vercel, click pe **"Add New..."** → **"Project"**
2. Caută repository-ul `upwork` (sau numele repository-ului tău)
3. Click pe **"Import"**

#### Pas 4: Configurează proiectul

Vercel va detecta automat că este un proiect Nuxt 3:

**Framework Preset:** Nuxt.js
**Build Command:** `npm run build`
**Output Directory:** `.output/public`
**Install Command:** `npm install`

**Root Directory:**
- Dacă site-ul este în subfolder (ex: `conta_site_nuxt`), setează: `conta_site_nuxt`
- Dacă este în root, lasă gol

**Environment Variables:** Nu sunt necesare (am eliminat formularul de contact)

#### Pas 5: Deploy!

1. Click pe **"Deploy"**
2. Așteaptă 1-2 minute
3. 🎉 Site-ul tău este live!

Vei primi un URL de genul: `https://conta-site-nuxt.vercel.app`

---

### Opțiunea 2: Deployment Direct (fără GitHub)

#### Instalează Vercel CLI

```bash
npm install -g vercel
```

#### Login în Vercel

```bash
vercel login
```

Urmează instrucțiunile pentru autentificare.

#### Deploy

Din folder-ul proiectului:

```bash
vercel
```

Răspunde la întrebări:
- **Set up and deploy?** → Yes
- **Which scope?** → Alege contul tău
- **Link to existing project?** → No
- **What's your project's name?** → conta-site (sau orice nume)
- **In which directory is your code located?** → `./` (dacă ești în folder-ul corect)

Vercel va detecta automat configurația și va face deploy.

#### Deploy la producție

```bash
vercel --prod
```

---

## După Deployment

### 1. Testează site-ul

Accesează URL-ul primit (ex: `https://conta-site-nuxt.vercel.app`) și verifică:

- ✅ Toate paginile funcționează
- ✅ Calculator-ul calculează corect
- ✅ Butonul WhatsApp se deschide corect
- ✅ Link-urile externe (telefon, email) funcționează

### 2. Configurează domeniu custom (opțional)

Dacă ai un domeniu (ex: `accountingexpert.ro`):

1. În dashboard Vercel, mergi la proiectul tău
2. Click pe **"Settings"** → **"Domains"**
3. Adaugă domeniul tău
4. Urmează instrucțiunile pentru a configura DNS-ul:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`

### 3. Actualizări ulterioare

După deployment, orice push la branch-ul `main` pe GitHub va declanșa automat un nou deployment pe Vercel.

```bash
git add .
git commit -m "Update calculator logic"
git push origin main
```

Vercel va rebuilda și redeploya automat în ~1-2 minute.

---

## Configurări Avansate

### Build Settings

Dacă ai probleme cu build-ul, poți modifica setările în `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nuxtjs",
  "outputDirectory": ".output/public"
}
```

### Environment Variables

Dacă în viitor ai nevoie de variabile de mediu:

1. Dashboard Vercel → **Settings** → **Environment Variables**
2. Adaugă variabilele (ex: `API_KEY`, `DATABASE_URL`)
3. Redeploy proiectul

---

## Troubleshooting

### Build Failed

**Problema:** Build-ul eșuează pe Vercel dar funcționează local

**Soluție:**
1. Verifică Node version în `package.json`:
```json
"engines": {
  "node": ">=18.0.0"
}
```
2. Rulează `npm run build` local pentru a vedea erorile
3. Verifică logs-urile în dashboard Vercel

### 404 la navigare între pagini

**Problema:** La refresh, paginile arată 404

**Soluție:** Vercel ar trebui să gestioneze automat SPA routing pentru Nuxt. Dacă apare problema, adaugă `vercel.json`:

```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/" }
  ]
}
```

### WhatsApp nu funcționează

**Problema:** Butonul WhatsApp nu deschide aplicația

**Soluție:** Verifică că funcția `contactWhatsApp()` este definită în `public/` sau în layout.

---

## Performance & SEO

După deployment, testează:

### Speed Test
- [PageSpeed Insights](https://pagespeed.web.dev/)
- Țintește scor 90+ pentru mobile și desktop

### SEO
- [Google Search Console](https://search.google.com/search-console)
- Adaugă site-ul pentru indexare

### Analytics (opțional)

Adaugă Google Analytics sau Vercel Analytics:

```bash
npm install @nuxtjs/google-analytics
```

---

## Costuri

**Vercel Free Tier include:**
- ✅ Bandwidth nelimitat
- ✅ 100 GB bandwidth/lună
- ✅ Deployments nelimitate
- ✅ SSL gratuit
- ✅ Domenii custom gratuite
- ✅ Preview deployments pentru branches

Pentru un site de contabilitate, **free tier-ul este mai mult decât suficient**.

---

## Suport

- **Documentație Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Documentație Nuxt:** [nuxt.com/docs](https://nuxt.com/docs)
- **Status Vercel:** [vercel-status.com](https://www.vercel-status.com/)

---

## Checklist Final

Înainte de a considera deployment-ul complet:

- [ ] Site-ul se încarcă corect pe URL-ul Vercel
- [ ] Calculator-ul funcționează pe toate scenariile (PFA, SRL)
- [ ] Link-urile de contact (telefon, email, WhatsApp) funcționează
- [ ] Navigation între pagini funcționează
- [ ] Site-ul arată bine pe mobile și desktop
- [ ] Performanța este bună (testează cu PageSpeed)
- [ ] (Opțional) Domeniul custom este configurat
- [ ] (Opțional) Analytics sunt configurate

🎉 Felicitări! Site-ul tău este live!
