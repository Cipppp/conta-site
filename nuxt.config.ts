export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'ro' },
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ro_RO' },
        { property: 'og:site_name', content: 'Accounting Business Expert' },
        { property: 'og:image', content: 'https://www.accountingbusiness.ro/images/og-cover.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
      ]
    }
  },

  css: ['~/assets/css/style.css'],

  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '587',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    smtpFrom: process.env.SMTP_FROM || '',
    orderEmail: process.env.ORDER_EMAIL || 'office@accountingbusiness.ro',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    tursoUrl: process.env.TURSO_URL || '',
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN || ''
  }
})
