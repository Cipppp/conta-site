<template>
  <div>
    <!-- Header -->
    <header class="header">
      <nav class="nav-container">
        <div class="logo-box">
          <h2>Accounting Business Expert</h2>
        </div>
        <ul class="nav-menu" id="navMenu">
          <li><NuxtLink to="/" :class="{ active: $route.path === '/' }">Acasă</NuxtLink></li>
          <li><NuxtLink to="/servicii" :class="{ active: $route.path === '/servicii' }">Servicii</NuxtLink></li>
          <li><NuxtLink to="/calculator" :class="{ active: $route.path === '/calculator' }">Calculator taxe</NuxtLink></li>
        </ul>
        <div class="hamburger" id="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <slot />

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Accounting Business Expert</h3>
            <p>SC Accounting Business Expert for Everyone SRL</p>
            <p>CUI: ROxxxxxxx</p>
            <p>Înregistrat la CECCAR - Filiala Prahova</p>
            <p style="margin-top: 1.5rem;">
              <strong>Contact:</strong><br>
              Str. Tudor Vladimirescu, nr. 95<br>
              Ploiești, Prahova<br>
              Tel: <a href="tel:+40722123456">+40 722 123 456</a><br>
              Email: <a href="mailto:office@accountingexpert.ro">office@accountingexpert.ro</a>
            </p>
          </div>
          <div class="footer-section">
            <h4>Link-uri Rapide</h4>
            <ul>
              <li><NuxtLink to="/">Acasă</NuxtLink></li>
              <li><NuxtLink to="/servicii">Servicii</NuxtLink></li>
              <li><NuxtLink to="/calculator">Calculator taxe</NuxtLink></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Servicii principale</h4>
            <ul>
              <li><NuxtLink to="/servicii#contabilitate">Contabilitate</NuxtLink></li>
              <li><NuxtLink to="/servicii#consultanta">Consultanță Fiscală</NuxtLink></li>
              <li><NuxtLink to="/servicii#salarizare">Salarizare</NuxtLink></li>
              <li><NuxtLink to="/servicii#infiintare">Înființare Firme</NuxtLink></li>
              <li><NuxtLink to="/servicii#analiza">Analiză Financiară</NuxtLink></li>
              <li><NuxtLink to="/servicii#it">Consultanță IT</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Accounting Business Expert for Everyone SRL. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const toggleMenu = () => {
  if (process.client) {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    navMenu?.classList.toggle('active');
    hamburger?.classList.toggle('active');
  }
};

onMounted(() => {
  if (process.client) {
    // Load the script.js for WhatsApp contact
    const script = document.createElement('script');
    script.src = '/js/script.js';
    document.body.appendChild(script);
  }
});
</script>

<style>
/* Fix NuxtLink styling in footer to match regular links */
.footer a,
.footer-section a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;
}

.footer a:hover,
.footer-section a:hover {
  color: var(--primary-color);
}

/* Ensure footer links display properly */
.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

/* Fix active link styling in navigation */
.nav-menu a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-menu a.active {
  color: var(--primary-color);
}

.nav-menu a:hover {
  color: var(--primary-color);
}
</style>
