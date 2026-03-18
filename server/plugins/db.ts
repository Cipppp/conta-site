import { initDB } from '../utils/db'

export default defineNitroPlugin(async () => {
  try {
    await initDB()
    console.log('Database initialized')
  } catch (err) {
    console.error('Database init failed:', err)
  }
})
