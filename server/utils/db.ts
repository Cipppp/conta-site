import { createClient } from '@libsql/client'

let _db: ReturnType<typeof createClient> | null = null

export function useDB() {
  if (!_db) {
    const config = useRuntimeConfig()
    _db = createClient({
      url: config.tursoUrl,
      authToken: config.tursoAuthToken
    })
  }
  return _db
}

export async function initDB() {
  const db = useDB()
  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      services TEXT NOT NULL,
      fulfilled INTEGER DEFAULT 0,
      hidden INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  // Add columns if table already exists (migration)
  const cols = await db.execute("PRAGMA table_info(orders)")
  const colNames = cols.rows.map((r: any) => r.name)
  if (!colNames.includes('fulfilled')) {
    await db.execute('ALTER TABLE orders ADD COLUMN fulfilled INTEGER DEFAULT 0')
  }
  if (!colNames.includes('hidden')) {
    await db.execute('ALTER TABLE orders ADD COLUMN hidden INTEGER DEFAULT 0')
  }
}

export async function saveOrder(order: {
  date: string
  email: string
  phone: string
  services: string[]
}) {
  const db = useDB()
  await db.execute({
    sql: 'INSERT INTO orders (date, email, phone, services) VALUES (?, ?, ?, ?)',
    args: [order.date, order.email, order.phone || '', order.services.join(', ')]
  })
}
