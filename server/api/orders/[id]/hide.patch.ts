import { useDB } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const db = useDB()
  await db.execute({
    sql: 'UPDATE orders SET hidden = 1 WHERE id = ?',
    args: [Number(id)]
  })
  return { success: true }
})
