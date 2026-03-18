<template>
  <!-- Login screen -->
  <div v-if="!authenticated" class="login-page">
    <form @submit.prevent="login" class="login-box">
      <h2>Admin</h2>
      <input
        v-model="password"
        type="password"
        placeholder="Parolă"
        class="login-input"
        autofocus
      />
      <button type="submit" class="login-btn" :disabled="loginLoading">
        {{ loginLoading ? 'Se verifică...' : 'Intră' }}
      </button>
      <p v-if="loginError" class="login-error">{{ loginError }}</p>
    </form>
  </div>

  <!-- Admin panel -->
  <div v-else class="admin-page">
    <div class="admin-header">
      <h1>Comenzi</h1>
      <div class="header-actions">
        <button @click="refresh" class="refresh-btn">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          Reîncarcă
        </button>
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          Ieși
        </button>
      </div>
    </div>

    <div v-if="loading && !orders.length" class="loading">Se încarcă...</div>

    <div v-else-if="!orders.length" class="empty">Nu există comenzi încă.</div>

    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="th-check">Onorată</th>
            <th>#</th>
            <th>Data</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Servicii</th>
            <th class="th-actions"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, i) in orders" :key="order.id" :class="{ fulfilled: order.fulfilled }">
            <td class="cell-check">
              <input
                type="checkbox"
                :checked="order.fulfilled"
                @change="toggleFulfilled(order)"
              />
            </td>
            <td class="cell-id">{{ orders.length - i }}</td>
            <td class="cell-date">{{ order.date }}</td>
            <td class="cell-email">
              <a :href="'mailto:' + order.email">{{ order.email }}</a>
            </td>
            <td class="cell-phone">
              <a v-if="order.phone && order.phone !== '-'" :href="'tel:' + order.phone">{{ order.phone }}</a>
              <span v-else class="muted">-</span>
            </td>
            <td class="cell-services">{{ order.services }}</td>
            <td class="cell-actions">
              <button @click="hideOrder(order)" class="delete-btn" title="Șterge din listă">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="total">Total comenzi: {{ orders.length }}</div>
  </div>
</template>

<script setup>
const password = ref('')
const token = ref('')
const authenticated = ref(false)
const loginLoading = ref(false)
const loginError = ref('')

const orders = ref([])
const loading = ref(true)

onMounted(() => {
  const saved = sessionStorage.getItem('admin_token')
  if (saved) {
    token.value = saved
    authenticated.value = true
    refresh()
  }
})

async function login() {
  loginLoading.value = true
  loginError.value = ''
  try {
    const res = await $fetch('/api/admin/login', {
      method: 'POST',
      body: { password: password.value }
    })
    token.value = res.token
    authenticated.value = true
    sessionStorage.setItem('admin_token', res.token)
    refresh()
  } catch {
    loginError.value = 'Parolă incorectă'
  } finally {
    loginLoading.value = false
  }
}

function logout() {
  token.value = ''
  authenticated.value = false
  sessionStorage.removeItem('admin_token')
  orders.value = []
  password.value = ''
}

function authHeaders() {
  return { Authorization: `Bearer ${token.value}` }
}

async function refresh() {
  loading.value = true
  try {
    orders.value = await $fetch('/api/orders', { headers: authHeaders() })
  } catch (err) {
    if (err?.response?.status === 401) logout()
    console.error('Failed to load orders:', err)
  } finally {
    loading.value = false
  }
}

async function toggleFulfilled(order) {
  const newVal = !order.fulfilled
  order.fulfilled = newVal
  await $fetch(`/api/orders/${order.id}/fulfill`, {
    method: 'PATCH',
    body: { fulfilled: newVal },
    headers: authHeaders()
  })
}

async function hideOrder(order) {
  if (!confirm('Ștergi comanda din listă? (rămâne în baza de date)')) return
  await $fetch(`/api/orders/${order.id}/hide`, {
    method: 'PATCH',
    headers: authHeaders()
  })
  orders.value = orders.value.filter(o => o.id !== order.id)
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
  text-align: center;
}

.login-box h2 {
  margin: 0 0 24px;
  color: #1e293b;
  font-size: 1.5rem;
}

.login-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.login-input:focus {
  border-color: #1e40af;
}

.login-btn {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: #1e40af;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #1d4ed8;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-error {
  margin-top: 12px;
  color: #ef4444;
  font-size: 0.9rem;
}

.admin-page {
  max-width: 1100px;
  margin: 120px auto 60px;
  padding: 0 20px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.admin-header h1 {
  font-size: 1.8rem;
  color: #1e293b;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #1e40af;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.refresh-btn:hover {
  background: #1d4ed8;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #f1f5f9;
  color: #64748b;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #e2e8f0;
  color: #334155;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

thead {
  background: #1e40af;
  color: white;
}

th {
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.th-check,
.th-actions {
  width: 60px;
  text-align: center;
}

td {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.95rem;
  color: #334155;
}

tbody tr:hover {
  background: #f8fafc;
}

tr.fulfilled td {
  opacity: 0.5;
  text-decoration: line-through;
}

tr.fulfilled td.cell-check,
tr.fulfilled td.cell-actions {
  opacity: 1;
  text-decoration: none;
}

.cell-check {
  text-align: center;
}

.cell-check input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #16a34a;
}

.cell-id {
  color: #94a3b8;
  font-weight: 500;
  width: 50px;
}

.cell-date {
  white-space: nowrap;
}

.cell-email a,
.cell-phone a {
  color: #1e40af;
  text-decoration: none;
}

.cell-email a:hover,
.cell-phone a:hover {
  text-decoration: underline;
}

.cell-actions {
  text-align: center;
}

.delete-btn {
  background: none;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  font-size: 1rem;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
}

.delete-btn:hover {
  color: #ef4444;
  background: #fef2f2;
}

.muted {
  color: #cbd5e1;
}

.loading,
.empty {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  font-size: 1.1rem;
}

.total {
  margin-top: 16px;
  text-align: right;
  color: #64748b;
  font-size: 0.9rem;
}
</style>
