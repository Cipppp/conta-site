# How to Start the Nuxt Project

## Quick Start

1. **Navigate to the project folder:**
   ```bash
   cd "/Users/ciprianpirvu/Developer/Project Cip/conta_site_nuxt"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open http://localhost:3000

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

## What Has Been Converted

✅ All 3 HTML pages converted to Vue/Nuxt:
  - index.html → pages/index.vue
  - servicii.html → pages/servicii.vue
  - legislatie.html → pages/legislatie.vue

✅ Shared layout with header and footer (layouts/default.vue)

✅ All CSS preserved (assets/css/style.css)

✅ All JavaScript functionality preserved (public/js/)

✅ Font Awesome icons included

✅ All data files copied (public/data/articles.json)

## Differences from Original HTML

1. **Routing**: Uses Vue Router instead of .html files
   - index.html → /
   - servicii.html → /servicii
   - legislatie.html → /legislatie

2. **Links**: All `<a href="...html">` converted to `<NuxtLink to="/...">`

3. **Dynamic Navigation**: Active navigation state automatically handled

4. **Better Performance**: Automatic code splitting and optimization

## Troubleshooting

**If you get errors:**
1. Make sure Node.js is installed (v16+ recommended)
2. Delete `node_modules` and run `npm install` again
3. Clear cache: `rm -rf .nuxt`

**Port already in use:**
Use a different port: `npm run dev -- --port 3001`
