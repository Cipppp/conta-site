<template>
  <div class="cart-wrapper">
    <button class="cart-btn" @click="toggleCart" aria-label="Coș de cumpărături">
      <i class="fas fa-shopping-cart"></i>
      <span v-if="selectedServices.length" class="cart-badge">{{ selectedServices.length }}</span>
    </button>

    <Teleport to="body">
      <!-- Overlay -->
      <Transition name="fade">
        <div v-if="isOpen" class="cart-overlay" @click="closeCart"></div>
      </Transition>

      <!-- Cart Panel -->
      <Transition name="slide-right">
        <div v-if="isOpen" class="cart-panel">
          <button class="cart-close-btn" @click="closeCart" aria-label="Închide">
            <i class="fas fa-times"></i>
          </button>

          <!-- Step 1: Service Selection -->
          <template v-if="step === 1">
            <div class="cart-step-header">
              <i class="fas fa-shopping-cart"></i>
              <h3>Selectează serviciile dorite</h3>
            </div>

            <div class="cart-services">
              <label
                v-for="service in services"
                :key="service.id"
                class="cart-service-item"
                :class="{ selected: selectedServices.includes(service.id) }"
              >
                <input type="checkbox" :value="service.id" v-model="selectedServices">
                <div class="cart-service-info">
                  <i :class="service.icon"></i>
                  <div>
                    <span class="cart-service-name">{{ service.name }}</span>
                    <span class="cart-service-desc">{{ service.description }}</span>
                  </div>
                </div>
                <i class="fas fa-check cart-service-check"></i>
              </label>
            </div>

            <button
              class="btn btn-primary cart-action-btn"
              :disabled="!selectedServices.length"
              @click="step = 2"
            >
              Continuă <i class="fas fa-arrow-right"></i>
            </button>
          </template>

          <!-- Step 2: Contact Form -->
          <template v-if="step === 2">
            <button class="cart-back-btn" @click="step = 1">
              <i class="fas fa-arrow-left"></i> Înapoi la servicii
            </button>

            <div class="cart-step-header">
              <i class="fas fa-envelope"></i>
              <h3>Date de contact</h3>
            </div>

            <div class="cart-summary">
              <p class="cart-summary-title">Servicii selectate:</p>
              <ul>
                <li v-for="id in selectedServices" :key="id">
                  <i class="fas fa-check"></i>
                  {{ services.find(s => s.id === id)?.name }}
                </li>
              </ul>
            </div>

            <form @submit.prevent="submitOrder" class="cart-form">
              <div class="cart-form-group">
                <label for="cart-email">Email *</label>
                <input
                  id="cart-email"
                  type="email"
                  v-model="email"
                  required
                  placeholder="email@exemplu.ro"
                >
              </div>
              <p v-if="error" class="cart-error">{{ error }}</p>
              <button
                type="submit"
                class="btn btn-primary cart-action-btn"
                :disabled="loading"
              >
                <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                {{ loading ? 'Se trimite...' : 'Trimite comanda' }}
              </button>
            </form>
          </template>

          <!-- Step 3: Confirmation -->
          <template v-if="step === 3">
            <div class="cart-confirmation">
              <div class="cart-confirmation-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Comanda a fost trimisă!</h3>
              <p>Vei fi contactat de un membru al echipei noastre în <strong>1-3 zile lucrătoare</strong>.</p>
              <div class="cart-payment-info">
                <i class="fas fa-info-circle"></i>
                <p>Plata se efectuează prin <strong>ordin de plată</strong>, după confirmarea comenzii și emiterea facturii.</p>
              </div>
              <button class="btn btn-primary cart-action-btn" @click="resetAndClose">
                Închide
              </button>
            </div>
          </template>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const step = ref(1)
const selectedServices = ref([])
const email = ref('')
const phone = ref('')
const loading = ref(false)
const error = ref('')

const services = [
  {
    id: 'contabilitate',
    name: 'Servicii de contabilitate',
    description: 'Contabilitate generală, raportări financiare, evidență contabilă',
    icon: 'fas fa-calculator'
  },
  {
    id: 'audit',
    name: 'Audit financiar',
    description: 'Audit financiar complet, verificare conformitate, rapoarte de audit',
    icon: 'fas fa-search-dollar'
  },
  {
    id: 'verificare',
    name: 'Verificare documente',
    description: 'Verificare și validare documente contabile și fiscale',
    icon: 'fas fa-clipboard-check'
  }
]

const toggleCart = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeCart = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

const submitOrder = async () => {
  error.value = ''
  loading.value = true

  try {
    const selectedServiceNames = selectedServices.value.map(id =>
      services.find(s => s.id === id)?.name
    )

    await $fetch('/api/order', {
      method: 'POST',
      body: {
        services: selectedServiceNames,
        email: email.value
      }
    })

    step.value = 3
  } catch (err) {
    error.value = 'A apărut o eroare. Vă rugăm încercați din nou.'
  } finally {
    loading.value = false
  }
}

const resetAndClose = () => {
  step.value = 1
  selectedServices.value = []
  email.value = ''
  phone.value = ''
  error.value = ''
  closeCart()
}

onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && isOpen.value) {
      closeCart()
    }
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style>
/* Cart Button */
.cart-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text-dark);
  padding: 0.5rem;
  transition: color 0.3s;
}

.cart-btn:hover {
  color: var(--primary-color);
}

.cart-badge {
  position: absolute;
  top: 0;
  right: -2px;
  background: var(--accent-color);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* Overlay */
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1100;
}

/* Panel */
.cart-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 100vw;
  height: 100vh;
  background: var(--background);
  z-index: 1101;
  padding: 2rem;
  overflow-y: auto;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
}

.cart-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--text-light);
  padding: 0.5rem;
  transition: color 0.3s;
}

.cart-close-btn:hover {
  color: var(--text-dark);
}

/* Step Header */
.cart-step-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-color);
}

.cart-step-header i {
  font-size: 1.25rem;
  color: var(--primary-color);
}

.cart-step-header h3 {
  font-size: 1.25rem;
  color: var(--text-dark);
  margin: 0;
}

/* Services List */
.cart-services {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.cart-service-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.cart-service-item:hover {
  border-color: var(--secondary-color);
  background: #f0f5ff;
}

.cart-service-item.selected {
  border-color: var(--primary-color);
  background: #eff6ff;
}

.cart-service-item input[type="checkbox"] {
  display: none;
}

.cart-service-info {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1;
}

.cart-service-info > i {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-top: 0.15rem;
  min-width: 28px;
  text-align: center;
}

.cart-service-name {
  display: block;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.cart-service-desc {
  display: block;
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.4;
}

.cart-service-check {
  color: var(--primary-color);
  font-size: 1.1rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.cart-service-item.selected .cart-service-check {
  opacity: 1;
}

/* Back Button */
.cart-back-btn {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s;
}

.cart-back-btn:hover {
  color: var(--primary-color);
}

/* Summary */
.cart-summary {
  background: var(--background-light);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.cart-summary-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.cart-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-summary li {
  font-size: 0.9rem;
  color: var(--text-light);
  padding: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-summary li i {
  color: var(--primary-color);
  font-size: 0.75rem;
}

/* Form */
.cart-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.cart-form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-dark);
}

.cart-form-group input {
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
  outline: none;
}

.cart-form-group input:focus {
  border-color: var(--primary-color);
}

.cart-error {
  color: var(--accent-color);
  font-size: 0.875rem;
  margin: 0;
}

/* Action Button */
.cart-action-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.cart-action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* Confirmation */
.cart-confirmation {
  text-align: center;
  padding: 2rem 0;
}

.cart-confirmation-icon {
  margin-bottom: 1.5rem;
}

.cart-confirmation-icon i {
  font-size: 4rem;
  color: #16a34a;
}

.cart-confirmation h3 {
  font-size: 1.5rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.cart-confirmation > p {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.cart-payment-info {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
}

.cart-payment-info > i {
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.cart-payment-info p {
  font-size: 0.9rem;
  color: var(--text-dark);
  line-height: 1.5;
  margin: 0;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active {
  transition: transform 0.3s ease;
}

.slide-right-leave-active {
  transition: transform 0.25s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 480px) {
  .cart-panel {
    width: 100vw;
    padding: 1.5rem;
  }
}
</style>