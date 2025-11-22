<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Servicii de Contabilitate<br>și Consultanță Fiscală</h1>
        <p>Expertiză contabilă și consultanță fiscală de încredere pentru afacerea ta</p>
        <div class="hero-buttons">
          <a href="#contact" class="btn btn-primary">Cere Ofertă</a>
          <NuxtLink to="/servicii" class="btn btn-secondary">Vezi Servicii</NuxtLink>
        </div>
      </div>
      <div class="hero-image">
        <div class="hero-card">
          <div class="stat">
            <h3>23+</h3>
            <p>Ani experiență</p>
          </div>
          <div class="stat">
            <h3>5</h3>
            <p>Specialiști</p>
          </div>
          <div class="stat">
            <h3>100+</h3>
            <p>Clienți activi</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="services-overview">
      <div class="container">
        <h2 class="section-title">Serviciile noastre principale</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-chart-bar"></i></div>
            <h3>Contabilitate Generală</h3>
            <p>Evidență contabilă completă, sintetică și analitică pentru societăți comerciale din orice domeniu.</p>
            <NuxtLink to="/servicii#contabilitate" class="service-link">Detalii →</NuxtLink>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-briefcase"></i></div>
            <h3>Consultanță Fiscală</h3>
            <p>Consultanță privind optimizarea fiscalității și asistență pe timpul controalelor fiscale.</p>
            <NuxtLink to="/servicii#consultanta" class="service-link">Detalii →</NuxtLink>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-users"></i></div>
            <h3>Salarizare & HR</h3>
            <p>Servicii complete de personal: dosare, state de plată, declarații și contracte de muncă.</p>
            <NuxtLink to="/servicii#salarizare" class="service-link">Detalii →</NuxtLink>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-building"></i></div>
            <h3>Înființare Firme</h3>
            <p>Asistență completă pentru începerea unei afaceri: plan de afaceri, studiu de fezabilitate, înregistrare.</p>
            <NuxtLink to="/servicii#infiintare" class="service-link">Detalii →</NuxtLink>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-chart-line"></i></div>
            <h3>Analiză Financiară</h3>
            <p>Rapoarte de analiză economico-financiară, buget de venituri și cheltuieli, cash-flow.</p>
            <NuxtLink to="/servicii#analiza" class="service-link">Detalii →</NuxtLink>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-laptop"></i></div>
            <h3>Consultanță IT</h3>
            <p>Consultanță în alegerea și implementarea de sisteme informatice ERP și software specializat.</p>
            <NuxtLink to="/servicii#it" class="service-link">Detalii →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="despre" class="about">
      <div class="container">
        <div class="about-header">
          <h2 class="section-title">Cine suntem</h2>
          <p class="section-subtitle">O echipă dedicată cu peste 23 de ani de experiență în contabilitate și consultanță fiscală</p>
        </div>

        <div class="about-story">
          <div class="story-content">
            <div class="story-icon">
              <i class="fas fa-building"></i>
            </div>
            <div class="story-text">
              <h3>Povestea noastră</h3>
              <p>Avem sediul în Ploiești, str. Tudor Vladimirescu, nr. 95. Suntem o societate cu răspundere limitată având ca principal obiect de activitate contabilitate, expertise contabile și judiciare, audit financiar și consultanță în domeniul fiscal (cod CAEN: 6920).</p>
              <p>Am înființat societatea în anul 2015, <strong>Dobre Emilia Loredana</strong> (expert contabil) și <strong>Dobre Mihai</strong>, în calitate de asociați. În prezent suntem înscriși în Tabloul Corpului Experților Contabili și Contabililor Autorizați din România, filiala Prahova.</p>
              <p>După o experiență bogată de 23 de ani în diferite companii de stat și private, atât ca angajați, cât și din 2004 ca antreprenori, am înființat această companie pentru a oferi servicii de calitate superioară în domeniul financiar-contabil.</p>
            </div>
          </div>
        </div>

        <div class="about-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="stat-number">23+</div>
            <div class="stat-label">Ani experiență</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-number">5</div>
            <div class="stat-label">Profesioniști</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-handshake"></i>
            </div>
            <div class="stat-number">100+</div>
            <div class="stat-label">Clienți activi</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-award"></i>
            </div>
            <div class="stat-number">CECCAR</div>
            <div class="stat-label">Membru oficial</div>
          </div>
        </div>

        <div class="about-team">
          <h3>Echipa noastră</h3>
          <p>În prezent, SC Accounting Business Expert for Everyone SRL are <strong>5 salariați</strong> care formează o echipă tânără de profesioniști specializați în prestarea de servicii financiar-contabile prompte și de calitate, adaptate specificului fiecărui client.</p>
          <p>Oferim servicii de consultanță fiscală, contabilitate generală și de personal-salarizare, care să se adapteze diverselor profile de activitate. Suntem dedicați clientului nostru și de aceea toată activitatea noastră este centrată să răspundă nevoilor acestuia. <strong>Afacerea noastră este bunul mers al afacerii clienților noștri.</strong></p>
        </div>

        <div class="about-values">
          <h3>Principiile noastre</h3>
          <div class="values-grid">
            <div class="value-card">
              <i class="fas fa-shield-alt"></i>
              <h4>Încredere</h4>
              <p>Construim relații bazate pe transparență și onestitate</p>
            </div>
            <div class="value-card">
              <i class="fas fa-user-tie"></i>
              <h4>Profesionalism</h4>
              <p>Expertise și dedicare în fiecare serviciu oferit</p>
            </div>
            <div class="value-card">
              <i class="fas fa-certificate"></i>
              <h4>Credibilitate</h4>
              <p>Servicii bazate pe standarde internaționale</p>
            </div>
            <div class="value-card">
              <i class="fas fa-star"></i>
              <h4>Calitate</h4>
              <p>Excelență în tot ceea ce facem pentru clienți</p>
            </div>
          </div>
        </div>

        <div class="about-clients">
          <div class="clients-section">
            <h3>Clienții noștri</h3>
            <p>Deservim persoane juridice române și străine, precum și persoane fizice autorizate, având domenii de activitate variate:</p>
            <div class="clients-grid">
              <div class="client-type"><i class="fas fa-industry"></i> Producție și microproducție bunuri de larg consum</div>
              <div class="client-type"><i class="fas fa-truck"></i> Comerț en-gros intern și extern</div>
              <div class="client-type"><i class="fas fa-store"></i> Comerț en-detail</div>
              <div class="client-type"><i class="fas fa-hands-helping"></i> Prestări servicii</div>
              <div class="client-type"><i class="fas fa-code"></i> Producție software, servicii IT</div>
              <div class="client-type"><i class="fas fa-briefcase"></i> Intermedieri în afaceri</div>
              <div class="client-type"><i class="fas fa-home"></i> Agenții imobiliare</div>
              <div class="client-type"><i class="fas fa-balance-scale"></i> Cabinete de avocatură</div>
              <div class="client-type"><i class="fas fa-clinic-medical"></i> Cabinete medicale</div>
              <div class="client-type"><i class="fas fa-tools"></i> PFA - mici meșteșugari</div>
            </div>
          </div>

          <div class="why-us-section">
            <h3>De ce să ne alegeți?</h3>
            <div class="benefits-list">
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Experiență acumulată</h4>
                  <p>Soluționăm problemele economice ale fiecărui client cu expertiza acumulată în 23 de ani</p>
                </div>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Răspundere contractuală</h4>
                  <p>Serviciile oferite au loc pe baze contractuale, asigurând obligații și responsabilități profesionale</p>
                </div>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Costuri reduse cu 50%</h4>
                  <p>Externalizarea reduce cu până la 50% costurile comparativ cu un departament de contabilitate propriu</p>
                </div>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Software performant</h4>
                  <p>Utilizăm un soft complex de contabilitate și gestiune cu module integrate</p>
                </div>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Echipă dedicată</h4>
                  <p>Întreaga noastră echipă se ocupă de societatea dumneavoastră, nu doar o singură persoană</p>
                </div>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Informare constantă</h4>
                  <p>Vă ținem la curent cu situația financiară și modificările legislative</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">Ce spun clienții noștri</h2>
        <p class="section-subtitle">Feedback-ul clienților noștri confirmă calitatea serviciilor oferite</p>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-rating">
              <span class="rating-number">5.0/5</span>
              <div class="rating-stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
            <p class="testimonial-text">"Colaborez cu echipa Accounting Business Expert de câțiva ani pentru Project Cip SRL și CEFANI SRL. Ceea ce mă impresionează cel mai mult este că răspund la orice oră și mereu își dau interesul pentru ceea ce fac. Profesionalism și dedicare de nota 10!"</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="author-info">
                <h4>Pirvu Ciprian</h4>
                <p>Administrator, Project Cip SRL & CEFANI SRL</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-rating">
              <span class="rating-number">5.0/5</span>
              <div class="rating-stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
            <p class="testimonial-text">"Recomand cu încredere serviciile lor! Consultanța fiscală primită ne-a ajutat să optimizăm costurile și să evităm probleme cu ANAF-ul. Echipa este mereu la curent cu legislația."</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="author-info">
                <h4>Ion Georgescu</h4>
                <p>Fondator, SC Import Export SRL</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-rating">
              <span class="rating-number">5.0/5</span>
              <div class="rating-stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
            <p class="testimonial-text">"De când am externalizat contabilitatea către ei, am economisit timp și bani. Rapoartele sunt mereu la zi, iar comunicarea este excelentă. Mulțumim pentru tot suportul!"</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="author-info">
                <h4>Ana Ionescu</h4>
                <p>Manager, Cabinet Medical Dr. Ionescu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup>
useHead({
  title: 'Accounting Business Expert - Servicii Contabilitate și Consultanță Fiscală',
});
</script>
