import { useDB } from '../utils/db'

export default defineEventHandler(async () => {
  const db = useDB()
  const result = await db.execute('SELECT * FROM orders WHERE hidden = 0 ORDER BY created_at DESC')
  return result.rows
})
