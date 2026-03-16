<template>
  <div class="ceccar-card" :class="{ verified: isVerified, loading: isLoading }">
    <div class="card-header">
      <img src="~/assets/css/logo-ceccar.png" alt="CECCAR Logo" class="ceccar-logo" />
      <div class="verification-badge" v-if="isVerified">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </div>
    </div>

    <div class="card-body">
      <h3 class="card-title">Membru CECCAR</h3>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Se verifică informațiile...</p>
      </div>

      <div v-else-if="isVerified && companyData" class="member-details">
        <div class="detail-row">
          <span class="detail-label">Nr. înregistrare:</span>
          <span class="detail-value">{{ companyData.regNumber }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Regiunea:</span>
          <span class="detail-value">{{ companyData.region }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Tip:</span>
          <span class="detail-value">{{ companyData.type }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">An autorizare:</span>
          <span class="detail-value">{{ companyData.authorizationYear }}</span>
        </div>
        <div class="detail-row" v-if="companyData.currentYearVisa">
          <span class="detail-label">Viză curentă:</span>
          <span class="detail-value verified-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Activ
          </span>
        </div>
        <div class="detail-row" v-if="companyData.lastVisaDate">
          <span class="detail-label">Ultima viză:</span>
          <span class="detail-value">{{ formatDate(companyData.lastVisaDate) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isVerified = ref(false);
const isLoading = ref(false);
const companyData = ref(null);

const verifyEligibility = async () => {
  isLoading.value = true;

  try {
    const response = await $fetch('/api/ceccar-search', {
      method: 'POST',
    });

    if (response.responseType === 'success' && response.pager?.items?.length > 0) {
      isVerified.value = true;
      companyData.value = response.pager.items[0];
    }
  } catch (error) {
    console.error('Eroare la verificarea CECCAR:', error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Verificare automată la montare
onMounted(() => {
  verifyEligibility();
});
</script>

<style scoped>
.ceccar-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  border: 1px solid #e8e8e8;
}

.ceccar-card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.ceccar-card.verified {
  border-color: #28a745;
  background: linear-gradient(180deg, #ffffff 0%, #f8fff9 100%);
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 1.5rem;
}

.ceccar-logo {
  max-width: 180px;
  height: auto;
  object-fit: contain;
}

.verification-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #28a745, #20c997);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.verification-badge svg {
  width: 20px;
  height: 20px;
  color: white;
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #6c757d;
  font-size: 0.9rem;
  font-style: italic;
}

.member-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.detail-row:hover {
  background: #e9ecef;
}

.detail-label {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

.detail-value {
  font-size: 0.95rem;
  color: #2c3e50;
  font-weight: 600;
}

.verified-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #28a745 !important;
}

.verified-badge svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .ceccar-card {
    padding: 1.5rem;
  }

  .ceccar-logo {
    max-width: 140px;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .detail-label,
  .detail-value {
    font-size: 0.85rem;
  }
}
</style>
