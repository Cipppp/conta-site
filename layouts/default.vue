<template>
  <div>
    <!-- Header -->
    <header class="header">
      <nav class="nav-container">
        <NuxtLink to="/" class="logo-box">
          <div class="logo-text-wrapper">
            <h2 class="logo-text">Accounting Business Expert</h2>
            <span class="logo-tagline">for Everyone</span>
          </div>
        </NuxtLink>
        <ul class="nav-menu" id="navMenu">
          <li><NuxtLink to="/" :class="{ active: $route.path === '/' }">Acasă</NuxtLink></li>
          <li><NuxtLink to="/servicii" :class="{ active: $route.path === '/servicii' }">Servicii</NuxtLink></li>
          <li><NuxtLink to="/calculator" :class="{ active: $route.path === '/calculator' }">Calculator taxe</NuxtLink></li>
        </ul>
        <div class="nav-actions">
          <ShoppingCart />
          <div class="hamburger" id="hamburger" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
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
            <p>CUI: 34751282</p>
            <p>Înregistrat la CECCAR - Filiala Prahova</p>
            <p style="margin-top: 1.5rem;">
              <strong>Contact:</strong><br>
              Str. Tudor Vladimirescu, nr. 95<br>
              Ploiești, Prahova<br>
              Tel: <a href="tel:+40766333433">+40 766 333 433</a><br>
              Tel: <a href="tel:+40764218182">+40 764 218 182</a><br>
              Tel: <a href="tel:+40767019025">+40 767 019 025</a><br>
              Email: <a href="mailto:office@accountingbusiness.ro">office@accountingbusiness.ro</a><br>
              Email: <a href="mailto:loredana@accountingbusiness.ro">loredana@accountingbusiness.ro</a>
            </p>
          </div>
          <div class="footer-section">
            <h4>Link-uri Rapide</h4>
            <ul>
              <li><NuxtLink to="/">Acasă</NuxtLink></li>
              <li><NuxtLink to="/servicii">Servicii</NuxtLink></li>
              <li><NuxtLink to="/calculator">Calculator taxe</NuxtLink></li>
            </ul>
            <h4 style="margin-top: 2rem;">Servicii principale</h4>
            <ul>
              <li><NuxtLink to="/servicii#contabilitate">Contabilitate</NuxtLink></li>
              <li><NuxtLink to="/servicii#consultanta">Consultanță Fiscală</NuxtLink></li>
              <li><NuxtLink to="/servicii#resurse-umane">Resurse Umane</NuxtLink></li>
              <li><NuxtLink to="/servicii#expertiza">Expertiză Contabilă</NuxtLink></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Verificare Eligibilitate</h4>
            <CeccarBadge />
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

const closeMenu = () => {
  if (process.client) {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    navMenu?.classList.remove('active');
    hamburger?.classList.remove('active');
  }
};

onMounted(() => {
  if (process.client) {
    // Load the script.js for WhatsApp contact
    const script = document.createElement('script');
    script.src = '/js/script.js';
    document.body.appendChild(script);

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      const navMenu = document.getElementById('navMenu');
      const hamburger = document.getElementById('hamburger');
      const isClickInsideNav = navMenu?.contains(event.target);
      const isClickOnHamburger = hamburger?.contains(event.target);

      if (!isClickInsideNav && !isClickOnHamburger && navMenu?.classList.contains('active')) {
        closeMenu();
      }
    });
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

/* Enhanced Logo Styling */
.logo-text-wrapper {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.5px;
}

.logo-tagline {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-color);
  font-style: normal;
  margin-top: 0.2rem;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 1.2rem;
  }

  .logo-tagline {
    font-size: 0.7rem;
  }
}

/* Nav Actions (cart + hamburger) */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 2rem;
}
</style>
