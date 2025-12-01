<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-header">
        <h2 class="section-title">Contactează-ne!</h2>
        <p class="section-subtitle">Suntem aici să te ajutăm. Sună-ne sau trimite-ne un mesaj pe WhatsApp.</p>
      </div>

      <div class="contact-cards">
        <div class="contact-card">
          <div class="card-icon">
            <i class="fas fa-phone-alt"></i>
          </div>
          <h3>Telefon</h3>
          <p>
            <a href="tel:+40762205999">+40 766 333 433</a><br>
            <a href="tel:+40344802302">+40 764 218 182</a>
          </p>
        </div>

        <div class="contact-card">
          <div class="card-icon">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <h3>Mobil / WhatsApp</h3>
          <p><a href="tel:+40766333433">+40 767 019 025</a></p>
          <button class="whatsapp-btn" @click="contactWhatsApp">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </button>
        </div>

        <div class="contact-card">
          <div class="card-icon">
            <i class="fas fa-envelope"></i>
          </div>
          <h3>Email</h3>
          <p>
            <a href="mailto:loredana@analizaserv.ro">loredana@analizaserv.ro</a><br>
            <a href="mailto:loredobre@gmail.com">loredobre@gmail.com</a><br>
            <a href="mailto:loredobre@yahoo.com">loredobre@yahoo.com</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const contactWhatsApp = () => {
  if (process.client && typeof window.contactWhatsApp === 'function') {
    window.contactWhatsApp();
  }
};
</script>

<style scoped>
.contact-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.contact-header {
  text-align: center;
  margin-bottom: 4rem;
}

.contact-header .section-title {
  font-size: 2.5rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.contact-header .section-subtitle {
  font-size: 1.125rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  border: 2px solid transparent;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(37, 99, 235, 0.15);
  border-color: var(--primary-color);
}

.card-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.25rem;
  color: white;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.contact-card h3 {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.contact-card p {
  color: var(--text-light);
  line-height: 1.8;
  margin: 0;
  font-size: 1.05rem;
}

.contact-card a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.contact-card a:hover {
  color: var(--secondary-color);
}

.whatsapp-btn {
  margin-top: 1.25rem;
  padding: 0.875rem 1.75rem;
  background: #25D366;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
}

.whatsapp-btn:hover {
  background: #128C7E;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

.whatsapp-btn i {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 3rem 0;
  }

  .contact-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .contact-card {
    padding: 2rem 1.5rem;
  }
}
</style>
