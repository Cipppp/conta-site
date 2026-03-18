import { useDB } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { fulfilled } = await readBody(event)
  const db = useDB()
  await db.execute({
    sql: 'UPDATE orders SET fulfilled = ? WHERE id = ?',
    args: [fulfilled ? 1 : 0, Number(id)]
  })
  return { success: true }
})
