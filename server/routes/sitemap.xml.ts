// Public pages only; /admin stays out of search engines.
const PAGES = ['/', '/servicii', '/calculator']

export default defineEventHandler((event) => {
  const { site } = useAppConfig(event)
  const urls = PAGES.map(path => `  <url><loc>${site.url}${path}</loc></url>`).join('\n')

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
