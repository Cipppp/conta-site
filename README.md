# Accounting Business Expert - Nuxt Website

This is a Nuxt 3 conversion of the Accounting Business Expert website - a professional accounting and tax consulting services website.

## Features

- 🚀 Built with Nuxt 3
- 💼 Professional accounting services website
- 📱 Fully responsive design
- 🎨 Modern UI with Font Awesome icons
- 📰 Dynamic news/legislation section
- 📞 WhatsApp integration for contact

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Static Generation

Generate static site:

```bash
npm run generate
```

## Project Structure

```
conta_site_nuxt/
├── assets/
│   └── css/
│       └── style.css          # Main stylesheet
├── layouts/
│   └── default.vue            # Default layout with header/footer
├── pages/
│   ├── index.vue              # Homepage
│   ├── servicii.vue           # Services page
│   └── legislatie.vue         # News/Legislation page
├── public/
│   ├── js/
│   │   ├── script.js          # Main JavaScript
│   │   └── articles.js        # Articles loader
│   └── data/
│       └── articles.json      # News articles data
├── app.vue                    # Root component
├── nuxt.config.ts             # Nuxt configuration
└── package.json               # Dependencies

```

## Pages

- **/** - Homepage with services overview, about section, and contact
- **/servicii** - Detailed services page
- **/legislatie** - Legislative news and updates

## Technologies Used

- Nuxt 3
- Vue 3
- Font Awesome 6
- Google Fonts (Inter)

## License

© 2025 Accounting Business Expert for Everyone SRL. All rights reserved.
