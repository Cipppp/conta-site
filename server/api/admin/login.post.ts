export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  const config = useRuntimeConfig()

  if (!config.adminPassword) {
    throw createError({ statusCode: 500, statusMessage: 'Admin password not configured' })
  }

  if (password !== config.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Parolă incorectă' })
  }

  return { token: config.adminPassword }
})
