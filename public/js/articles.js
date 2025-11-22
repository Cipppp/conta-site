// Articles Management for Legislation Page

// Articles data - inline pentru a funcționa fără server
let allArticles = [
  {
    "id": 1,
    "title": "Modificări legislative în domeniul fiscal pentru 2025",
    "category": "Fiscal",
    "date": "2025-11-07",
    "excerpt": "Aflați despre cele mai recente modificări ale Codului Fiscal care afectează afacerea dumneavoastră începând cu anul 2025. Aceste schimbări aduc noi oportunități, dar și responsabilități pentru contribuabili.",
    "content": "<p>Începând cu 1 ianuarie 2025, intră în vigoare importante modificări ale Codului Fiscal care vor afecta majoritatea companiilor din România.</p><h3>Principalele modificări</h3><ul><li>Modificări la cota de impozit pe profit pentru microîntreprinderi</li><li>Schimbări în regimul de deductibilitate a cheltuielilor de protocol</li><li>Noi prevederi privind amortizarea fiscală a mijloacelor fixe</li><li>Actualizări la regimul fiscal pentru venituri din dividende</li><li>Clarificări privind aplicarea split TVA</li></ul><h3>Ce trebuie să faceți?</h3><p>Companiile trebuie să își revizuiască politicile fiscale și contabile pentru a se asigura că sunt în conformitate cu noile reglementări. Recomandăm o analiză detaliată a impactului acestor modificări asupra activității dumneavoastră.</p><p>Echipa noastră este pregătită să vă ofere consultanță personalizată pentru a naviga aceste schimbări legislative și pentru a vă optimiza situația fiscală.</p>"
  },
  {
    "id": 2,
    "title": "Noi obligații de raportare pentru 2025",
    "category": "Contabilitate",
    "date": "2025-11-05",
    "excerpt": "Informații esențiale despre noile cerințe de raportare fiscală ce intră în vigoare în noul an. Aflați ce declarații suplimentare trebuie depuse și care sunt termenele.",
    "content": "<p>Anul 2025 aduce noi obligații de raportare pentru companiile din România, menite să crească transparența fiscală și să combată evaziunea.</p><h3>Declarații noi sau modificate</h3><ul><li>Declarația 406 - Raportare plăți către beneficiari din state cu regim fiscal preferențial</li><li>Extinderea Declarației 394 pentru raportarea operațiunilor intracomunitare</li><li>Noi formulare pentru raportarea schimburilor de bunuri și servicii</li><li>Declarația privind beneficiarii reali - actualizări obligatorii</li></ul><h3>Termene importante</h3><p>Majoritatea declarațiilor noi trebuie depuse trimestrial, cu termen în luna următoare încheierii trimestrului. Prima raportare va fi pentru trimestrul I 2025, cu termen de depunere până pe 25 aprilie 2025.</p><h3>Sancțiuni pentru nedepunere</h3><p>Nedepunerea sau depunerea cu întârziere a acestor declarații poate atrage amenzi considerabile, de la 500 lei la 10.000 lei, în funcție de gravitatea și frecvența abaterii.</p>"
  },
  {
    "id": 3,
    "title": "Ghid complet TVA pentru comerțul electronic",
    "category": "TVA",
    "date": "2025-11-01",
    "excerpt": "Tot ce trebuie să știți despre aplicarea TVA în comerțul online și vânzările transfrontaliere. Reguli actualizate pentru platformele de e-commerce și marketplace-uri.",
    "content": "<p>Comerțul electronic continuă să crească, iar reglementările TVA s-au adaptat acestei realități. Iată un ghid complet pentru aplicarea corectă a TVA în vânzările online.</p><h3>TVA pentru vânzări interne</h3><ul><li>Cota standard de 19% se aplică pentru majoritatea bunurilor și serviciilor</li><li>Cota redusă de 9% pentru anumite produse alimentare și servicii turistice</li><li>Obligația de emitere a facturilor electronice prin sistemul e-Factura</li></ul><h3>Vânzări intracomunitare (în UE)</h3><p>Pentru vânzările către alte state membre UE există reguli speciale:</p><ul><li>Livrările către persoane juridice cu TVA valabil în alt stat UE sunt scutite de TVA (taxare inversă)</li><li>Livrările către persoane fizice se taxează în România până la atingerea pragului specific pentru fiecare țară</li><li>Sistemul OSS (One Stop Shop) simplifică declararea TVA pentru vânzări transfrontaliere</li></ul><h3>Vânzări în afara UE</h3><p>Exporturile către țări din afara UE sunt scutite de TVA, dar necesită documentație de export corespunzătoare (vamală).</p><h3>Marketplace-uri și platforme</h3><p>Dacă vindeți prin platforme precum Amazon, eMag Marketplace sau altele, platforma poate avea obligații de colectare și plată a TVA în anumite situații.</p>"
  },
  {
    "id": 4,
    "title": "Modificări privind salariul minim pe economie 2025",
    "category": "Legislație Muncă",
    "date": "2025-10-28",
    "excerpt": "Guvernul a anunțat majorarea salariului minim brut pe economie. Vedeți cum vă afectează această modificare și ce trebuie să faceți.",
    "content": "<p>Începând cu 1 ianuarie 2025, salariul minim brut pe economie va crește, afectând sute de mii de angajați și angajatori din România.</p><h3>Noul salariu minim</h3><p>Salariul minim brut pe economie va fi de 3.700 lei, cu o creștere de 300 lei față de anul precedent. Acest lucru înseamnă un salariu net de aproximativ 2.250 lei (în funcție de deducerile personale).</p><h3>Salariu minim diferențiat pentru construcții</h3><p>Pentru sectorul construcțiilor, salariul minim va fi de 4.300 lei brut pe lună, recunoscând specificul acestui sector.</p><h3>Impact asupra angajatorilor</h3><ul><li>Recalcularea salariilor pentru toți angajații cu salariu minim</li><li>Ajustarea bugetului de personal și a contribuțiilor sociale</li><li>Actualizarea contractelor de muncă și a statelor de plată</li><li>Posibile renegocieri de contracte comerciale pentru firme cu marje reduse</li></ul><h3>Ce trebuie să faceți?</h3><p>Angajatorii trebuie să:</p><ul><li>Actualizeze contractele de muncă prin acte adiționale până pe 31 decembrie 2024</li><li>Recalculeze bugetul de cheltuieli cu personalul</li><li>Se asigure că au lichidități pentru noile salarii</li><li>Depună declarațiile actualizate către ITM și ANAF</li></ul>"
  },
  {
    "id": 5,
    "title": "Simplificare proceduri ANAF - Ghid practic",
    "category": "Actualizări",
    "date": "2025-10-20",
    "excerpt": "ANAF introduce proceduri simplificate pentru contribuabili. Aflați ce servicii noi sunt disponibile și cum vă pot ajuta să economisiți timp.",
    "content": "<p>ANAF continuă procesul de digitalizare și simplificare a procedurilor administrative, oferind noi servicii online pentru contribuabili.</p><h3>Servicii noi în Spațiul Privat Virtual (SPV)</h3><ul><li>Depunerea declarațiilor fiscale prin formular inteligent cu verificări automate</li><li>Consultarea în timp real a situației fiscale și a obligațiilor de plată</li><li>Solicitarea online a certificatului fiscal digital</li><li>Programări online pentru audiențe la sediul ANAF</li><li>Chat online cu inspectori pentru întrebări simple</li></ul><h3>Raportări simplificate pentru microîntreprinderi</h3><p>Microîntreprinderile cu venituri sub 500.000 euro beneficiază de declarații simplificate, cu mai puține informații de completat și termene mai flexibile.</p><h3>Notificări automate</h3><p>Sistemul ANAF trimite acum notificări automate prin email și SMS pentru:</p><ul><li>Termene de depunere a declarațiilor</li><li>Termene de plată a obligațiilor fiscale</li><li>Aparițite de noi documente în SPV</li><li>Începerea controalelor fiscale</li></ul><h3>Cum vă înregistrați?</h3><p>Pentru a accesa aceste servicii, aveți nevoie de un cont în SPV și un certificat digital calificat sau tokenul eliberat de ANAF. Echipa noastră vă poate ajuta cu înregistrarea și utilizarea acestor servicii.</p>"
  },
  {
    "id": 6,
    "title": "Facilitați fiscale pentru investiții în tehnologie",
    "category": "Fiscal",
    "date": "2025-10-15",
    "excerpt": "Noi stimulente fiscale pentru companiile care investesc în digitalizare și inovare. Descoperiți cum puteți beneficia de aceste facilități.",
    "content": "<p>Guvernul României a introdus noi facilități fiscale pentru a încuraja investițiile în tehnologie și digitalizare, aplicabile începând cu exercițiul fiscal 2025.</p><h3>Deducere suplimentară pentru investiții IT</h3><p>Companiile care investesc în echipamente IT, software și servicii de digitalizare pot beneficia de o deducere fiscală suplimentară de 50% din valoarea investiției.</p><h3>Ce investiții sunt eligibile?</h3><ul><li>Achiziția de hardware (servere, computere, echipamente de rețea)</li><li>Licențe software pentru activitatea de producție sau servicii</li><li>Implementarea de sisteme ERP, CRM sau alte sisteme integrate</li><li>Servicii de cloud computing pentru operațiunile companiei</li><li>Investiții în securitate cibernetică</li><li>Dezvoltare de aplicații software personalizate</li></ul><h3>Cum se aplică deducerea?</h3><p>Deducerea se aplică la calculul impozitului pe profit, reducând baza impozabilă. De exemplu, pentru o investiție de 100.000 lei în echipamente IT, compania poate deduce 150.000 lei din veniturile impozabile.</p><h3>Condiții de eligibilitate</h3><ul><li>Compania trebuie să fie plătitoare de impozit pe profit</li><li>Investițiile trebuie păstrate în patrimoniu cel puțin 3 ani</li><li>Utilizarea activelor trebuie documentată și justificată</li><li>Se depune o declarație specială la ANAF până pe 25 martie</li></ul><h3>Cum vă ajutăm?</h3><p>Echipa noastră poate evalua eligibilitatea investițiilor dumneavoastră, calcula beneficiile fiscale și vă asistă în întocmirea documentației necesare.</p>"
  }
];

let currentFilter = 'toate';

// Load articles on page load
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    setupFilterButtons();
    setupNewsletterForm();
});

// Load articles (now from inline data)
function loadArticles() {
    displayArticles(allArticles);
}

// Display articles
function displayArticles(articles) {
    const container = document.getElementById('articlesContainer');

    if (!articles || articles.length === 0) {
        displayNoArticles('Nu există articole în această categorie.');
        return;
    }

    // Sort articles by date (newest first)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = articles.map(article => `
        <article class="article-card" data-category="${article.category}">
            <div class="article-header">
                <div class="article-meta">
                    <span class="article-date">${formatDate(article.date)}</span>
                </div>
                <span class="article-category">${article.category}</span>
            </div>
            <div class="article-body">
                <h2>${article.title}</h2>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-content" id="content-${article.id}">
                    ${article.content}
                </div>
                <button class="read-more-btn" onclick="toggleArticle(${article.id})">
                    <span id="btn-text-${article.id}">Citește mai mult →</span>
                </button>
            </div>
        </article>
    `).join('');
}

// Display message when no articles
function displayNoArticles(message) {
    const container = document.getElementById('articlesContainer');
    container.innerHTML = `<div class="no-articles">${message}</div>`;
}

// Format date to Romanian format
function formatDate(dateString) {
    const months = ['IAN', 'FEB', 'MAR', 'APR', 'MAI', 'IUN', 'IUL', 'AUG', 'SEP', 'OCT', 'NOI', 'DEC'];
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Toggle article expanded/collapsed
function toggleArticle(articleId) {
    const content = document.getElementById(`content-${articleId}`);
    const btnText = document.getElementById(`btn-text-${articleId}`);

    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        btnText.textContent = 'Citește mai mult →';
        // Scroll to article top
        content.closest('.article-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        content.classList.add('expanded');
        btnText.textContent = '← Citește mai puțin';
    }
}

// Setup filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Get selected category
            const category = this.getAttribute('data-category');
            currentFilter = category;

            // Filter and display articles
            filterArticles(category);
        });
    });
}

// Filter articles by category
function filterArticles(category) {
    if (category === 'toate') {
        displayArticles(allArticles);
    } else {
        const filtered = allArticles.filter(article => article.category === category);
        displayArticles(filtered);
    }
}

// Setup newsletter form
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;

        // Here you would typically send the email to your backend
        // For now, we'll just show an alert
        alert(`Mulțumim pentru abonare! Vei primi noutățile noastre la adresa: ${email}`);
        this.reset();
    });
}
