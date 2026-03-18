export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Only protect /api/orders routes (not /api/order which is the public submit endpoint)
  if (!url.pathname.startsWith('/api/orders')) return

  const config = useRuntimeConfig()
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (token !== config.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Neautorizat' })
  }
})
