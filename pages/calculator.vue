<template>
  <div>
    <!-- Hero Section -->
    <section class="calculator-hero">
      <div class="container">
        <h1>Calculator taxe PFA și SRL 2025</h1>
        <p>Calculează rapid taxele și impozitele pe care trebuie să le plătești în funcție de forma de organizare și venitul tău</p>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="calculator-section">
      <div class="container">
        <!-- Entity Type Selection -->
        <div class="entity-selector">
          <button
            :class="['entity-btn', { active: entityType === 'pfa' }]"
            @click="entityType = 'pfa'"
          >
            <i class="fas fa-user"></i>
            <span>PFA / Persoană fizică autorizată</span>
          </button>
          <button
            :class="['entity-btn', { active: entityType === 'srl' }]"
            @click="entityType = 'srl'"
          >
            <i class="fas fa-building"></i>
            <span>SRL / Micro-întreprindere</span>
          </button>
        </div>

        <!-- Calculator Form -->
        <div class="calculator-content">
          <!-- PFA Calculator -->
          <div v-if="entityType === 'pfa'" class="calculator-form">
            <h2>Calculator PFA - Venituri și taxe 2025</h2>

            <div class="form-group">
              <label for="pfa-income">
                <i class="fas fa-money-bill-wave"></i>
                Venit brut lunar (RON)
              </label>
              <input
                type="number"
                id="pfa-income"
                v-model.number="pfaIncome"
                min="0"
                placeholder="Ex: 5000"
              />
            </div>

            <div class="form-group">
              <label for="pfa-expenses">
                <i class="fas fa-receipt"></i>
                Cheltuieli deductibile lunare (RON)
              </label>
              <input
                type="number"
                id="pfa-expenses"
                v-model.number="pfaExpenses"
                min="0"
                placeholder="Ex: 1000"
              />
              <small>Cheltuieli justificate cu documente (materii prime, transport, etc.)</small>
            </div>

            <div class="form-group-checkbox">
              <input
                type="checkbox"
                id="pfa-norma"
                v-model="pfaNormaVenit"
              />
              <label for="pfa-norma">
                Aplicare normă de venit (20% - fără documente cheltuieli)
              </label>
            </div>

            <div class="form-group-checkbox">
              <input
                type="checkbox"
                id="pfa-salariat"
                v-model="pfaSalariat"
              />
              <label for="pfa-salariat">
                Sunt salariat (pentru calcul CASS)
              </label>
            </div>

            <!-- Results PFA -->
            <div class="results-section">
              <h3><i class="fas fa-calculator"></i> Rezultate calcul PFA</h3>

              <div class="result-card">
                <div class="result-item">
                  <span class="result-label">Venit brut lunar:</span>
                  <span class="result-value">{{ formatCurrency(pfaIncome) }}</span>
                </div>
                <div class="result-item">
                  <span class="result-label">Cheltuieli deductibile:</span>
                  <span class="result-value deduction">- {{ formatCurrency(pfaExpenses) }}</span>
                </div>
                <div class="result-item total">
                  <span class="result-label">Venit net (baza impozabilă):</span>
                  <span class="result-value">{{ formatCurrency(pfaCalculations.venitNet) }}</span>
                </div>
              </div>

              <div class="result-card taxes">
                <h4>Taxe și contribuții lunare</h4>

                <div class="result-item">
                  <span class="result-label">
                    CAS (25% - contribuție la pensie)
                    <small>{{ pfaCalculations.casNote }}</small>
                  </span>
                  <span class="result-value tax">{{ formatCurrency(pfaCalculations.cas) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">
                    CASS (10% - asigurări de sănătate)
                    <small>{{ pfaCalculations.cassNote }}</small>
                  </span>
                  <span class="result-value tax">{{ formatCurrency(pfaCalculations.cass) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">
                    Impozit pe venit (10%)
                  </span>
                  <span class="result-value tax">{{ formatCurrency(pfaCalculations.impozit) }}</span>
                </div>

                <div class="result-item total-taxes">
                  <span class="result-label"><strong>Total taxe lunare:</strong></span>
                  <span class="result-value"><strong>{{ formatCurrency(pfaCalculations.totalTaxe) }}</strong></span>
                </div>

                <div class="result-item net-income">
                  <span class="result-label"><strong>Rămâi cu (venit net final):</strong></span>
                  <span class="result-value highlight"><strong>{{ formatCurrency(pfaCalculations.ramaneCuMine) }}</strong></span>
                </div>
              </div>

              <!-- Annual Summary -->
              <div class="result-card annual">
                <h4><i class="fas fa-calendar-alt"></i> Estimare anuală</h4>
                <div class="result-item">
                  <span class="result-label">Venit brut anual:</span>
                  <span class="result-value">{{ formatCurrency(pfaIncome * 12) }}</span>
                </div>
                <div class="result-item">
                  <span class="result-label">Total taxe anuale:</span>
                  <span class="result-value tax">{{ formatCurrency(pfaCalculations.totalTaxe * 12) }}</span>
                </div>
                <div class="result-item">
                  <span class="result-label">Venit net anual:</span>
                  <span class="result-value highlight">{{ formatCurrency(pfaCalculations.ramaneCuMine * 12) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- SRL Calculator -->
          <div v-else class="calculator-form">
            <h2>Calculator SRL - micro-întreprindere 2025</h2>

            <div class="form-group">
              <label for="srl-income">
                <i class="fas fa-money-bill-wave"></i>
                Cifra de afaceri lunară (RON)
              </label>
              <input
                type="number"
                id="srl-income"
                v-model.number="srlIncome"
                min="0"
                placeholder="Ex: 10000"
              />
            </div>

            <div class="form-group">
              <label for="srl-expenses">
                <i class="fas fa-receipt"></i>
                Cheltuieli lunare (RON)
              </label>
              <input
                type="number"
                id="srl-expenses"
                v-model.number="srlExpenses"
                min="0"
                placeholder="Ex: 4000"
              />
              <small>Include: salarii, materii prime, chirii, utilități, etc.</small>
            </div>

            <div class="form-group">
              <label for="srl-salary">
                <i class="fas fa-user-tie"></i>
                Salariu administrator/angajat (RON brut)
              </label>
              <input
                type="number"
                id="srl-salary"
                v-model.number="srlSalary"
                min="0"
                placeholder="Ex: 3000"
              />
              <small>Salariul brut lunar (este inclus în cheltuieli)</small>
            </div>

            <div class="form-group">
              <label for="srl-cota">
                <i class="fas fa-percentage"></i>
                Cota impozit pe venit
              </label>
              <select id="srl-cota" v-model.number="srlImpozitCota" style="width: 100%; padding: 0.875rem 1rem; border: 2px solid var(--border-color); border-radius: 8px; font-size: 1rem; font-family: inherit;">
                <option :value="1">1% (IT, producție, construcții)</option>
                <option :value="3">3% (alte domenii)</option>
              </select>
              <small>Micro-întreprindere - cifră de afaceri sub 500.000 €</small>
            </div>

            <div class="form-group-checkbox">
              <input
                type="checkbox"
                id="srl-proprietar-salariat"
                v-model="srlProprietarSalariat"
              />
              <label for="srl-proprietar-salariat">
                Proprietarul este salariat altundeva (pentru calcul CASS pe dividende)
              </label>
            </div>

            <!-- Results SRL -->
            <div class="results-section">
              <h3><i class="fas fa-calculator"></i> Rezultate Calcul SRL (Micro-întreprindere)</h3>

              <div class="result-card">
                <div class="result-item">
                  <span class="result-label">Cifra de afaceri lunară:</span>
                  <span class="result-value">{{ formatCurrency(srlIncome) }}</span>
                </div>
                <div class="result-item">
                  <span class="result-label">Cheltuieli totale:</span>
                  <span class="result-value deduction">- {{ formatCurrency(srlExpenses) }}</span>
                </div>
                <div class="result-item total">
                  <span class="result-label">Profit brut lunar:</span>
                  <span class="result-value">{{ formatCurrency(srlCalculations.profitBrut) }}</span>
                </div>
              </div>

              <div class="result-card taxes">
                <h4>Taxe și Contribuții Lunare</h4>

                <div class="result-item">
                  <span class="result-label">
                    Impozit pe profit ({{ srlCalculations.cotaImpozit }}%)
                    <small>{{ srlCalculations.impozitNote }}</small>
                  </span>
                  <span class="result-value tax">{{ formatCurrency(srlCalculations.impozitProfit) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">
                    Contribuții CAS angajat (25% din {{ formatCurrency(srlSalary) }})
                  </span>
                  <span class="result-value tax">{{ formatCurrency(srlCalculations.casAngajat) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">
                    CASS angajat (10% din {{ formatCurrency(srlSalary) }})
                  </span>
                  <span class="result-value tax">{{ formatCurrency(srlCalculations.cassAngajat) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">
                    Contribuție muncă angajator (2.25% din {{ formatCurrency(srlSalary) }})
                  </span>
                  <span class="result-value tax">{{ formatCurrency(srlCalculations.contributieAngajator) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">
                    Impozit pe venit angajat (10% din {{ formatCurrency(srlSalary) }})
                  </span>
                  <span class="result-value tax">{{ formatCurrency(srlCalculations.impozitVenit) }}</span>
                </div>

                <div class="result-item total-taxes">
                  <span class="result-label"><strong>Total taxe lunare (firmă + angajat):</strong></span>
                  <span class="result-value"><strong>{{ formatCurrency(srlCalculations.totalTaxe) }}</strong></span>
                </div>

                <div class="result-item">
                  <span class="result-label">Profit după taxe:</span>
                  <span class="result-value">{{ formatCurrency(srlCalculations.profitDupaTaxe) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">Salariu net angajat:</span>
                  <span class="result-value highlight">{{ formatCurrency(srlCalculations.salariuNet) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">
                    Dividende brute disponibile
                  </span>
                  <span class="result-value">{{ formatCurrency(srlCalculations.profitDupaTaxe) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">
                    Impozit pe dividende (10%)
                  </span>
                  <span class="result-value deduction">- {{ formatCurrency(srlCalculations.taxaDividende) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">
                    CASS pe dividende
                    <small>{{ srlCalculations.cassDividendeNote }}</small>
                  </span>
                  <span class="result-value deduction">- {{ formatCurrency(srlCalculations.cassDividende) }}</span>
                </div>

                <div class="result-item">
                  <span class="result-label">Dividende nete finale:</span>
                  <span class="result-value highlight">{{ formatCurrency(srlCalculations.dividendeNet) }}</span>
                </div>

                <div class="result-item net-income">
                  <span class="result-label"><strong>Total venit net proprietar (salariu + dividende):</strong></span>
                  <span class="result-value highlight"><strong>{{ formatCurrency(srlCalculations.totalVenitNet) }}</strong></span>
                </div>
              </div>

              <!-- Annual Summary -->
              <div class="result-card annual">
                <h4><i class="fas fa-calendar-alt"></i> Estimare anuală</h4>
                <div class="result-item">
                  <span class="result-label">Cifra de afaceri anuală:</span>
                  <span class="result-value">{{ formatCurrency(srlIncome * 12) }}</span>
                </div>
                <div class="result-item">
                  <span class="result-label">Profit anual după taxe:</span>
                  <span class="result-value">{{ formatCurrency(srlCalculations.profitDupaTaxe * 12) }}</span>
                </div>
                <div class="result-item">
                  <span class="result-label">Total venit net anual:</span>
                  <span class="result-value highlight">{{ formatCurrency(srlCalculations.totalVenitNet * 12) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Notes -->
        <div class="notes-section">
          <div class="note-card">
            <i class="fas fa-info-circle"></i>
            <div>
              <h4>Notă importantă</h4>
              <p>Calculele sunt orientative și bazate pe legislația fiscală 2025. Pentru sfaturi personalizate și optimizare fiscală, contactează-ne pentru o consultanță gratuită!</p>
            </div>
          </div>

          <div class="note-card warning">
            <i class="fas fa-exclamation-triangle"></i>
            <div>
              <h4>Legislație 2025</h4>
              <ul>
                <li><strong>PFA - CAS (25%):</strong> Sub 48.600 lei/an - opțional | 48.600-97.200 lei/an - 12.150 lei/an | Peste 97.200 lei/an - 24.300 lei/an</li>
                <li><strong>PFA - CASS (10%):</strong> Dacă salariat - 10% fără minim | Dacă NU salariat - Sub 24.300 lei/an: 2.430 lei/an | 24.300-243.000 lei/an: 10% din venit net | Peste 243.000 lei/an: 24.300 lei/an</li>
                <li><strong>PFA - Impozit:</strong> 10% pe (venit net − CAS − CASS)</li>
                <li><strong>SRL Micro-întreprindere:</strong> Impozit pe venituri (1% IT/producție/construcții, 3% alte domenii). Obligatoriu 1 angajat.</li>
                <li><strong>Dividende SRL:</strong> Impozit 10% + CASS pe plafoane (dacă proprietarul NU este salariat altundeva)</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="cta-section">
          <h3>Ai nevoie de ajutor cu taxele și contabilitatea?</h3>
          <p>Echipa noastră de experți contabili te poate ajuta să optimizezi taxele și să ai conformitate 100%</p>
          <a href="#contact" class="cta-button">
            <i class="fas fa-phone-alt"></i>
            Solicită Consultanță Gratuită
          </a>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

useHead({
  title: 'Calculator taxe PFA și SRL 2025 - Accounting Business Expert',
});

// Entity type
const entityType = ref('pfa');

// PFA Data
const pfaIncome = ref(5000);
const pfaExpenses = ref(1000);
const pfaNormaVenit = ref(false);
const pfaSalariat = ref(false);

// SRL Data
const srlIncome = ref(10000);
const srlExpenses = ref(4000);
const srlSalary = ref(3000);
const srlImpozitCota = ref(3); // 1% or 3%
const srlProprietarSalariat = ref(false); // For CASS on dividends

// PFA Calculations
const pfaCalculations = computed(() => {
  let venitNet = pfaIncome.value;

  // Apply norma de venit or actual expenses
  if (pfaNormaVenit.value) {
    // Norma de venit: 20% expenses automatically
    venitNet = pfaIncome.value * 0.8;
  } else {
    venitNet = pfaIncome.value - pfaExpenses.value;
  }

  venitNet = Math.max(0, venitNet);

  // Annual net income for bracket calculations
  const venitNetAnual = venitNet * 12;

  // CAS calculation (25%) - Fixed amounts based on annual brackets
  let casLunar = 0;
  let casNote = 'Sub 48.600 lei/an - opțional';
  if (venitNetAnual < 48600) {
    casLunar = 0;
    casNote = 'Sub 48.600 lei/an - opțional';
  } else if (venitNetAnual >= 48600 && venitNetAnual < 97200) {
    casLunar = 12150 / 12; // 1.012,50 lei/lună
    casNote = 'Plafon 48.600-97.200 lei/an - 12.150 lei/an';
  } else {
    casLunar = 24300 / 12; // 2.025 lei/lună
    casNote = 'Peste 97.200 lei/an - 24.300 lei/an';
  }

  // CASS calculation (10%)
  let cassLunar = 0;
  let cassNote = '';

  if (pfaSalariat.value) {
    // If employed: 10% × Net Income (no minimum)
    cassLunar = venitNet * 0.10;
    cassNote = 'Salariat - 10% din venit net (fără minim)';
  } else {
    // If NOT employed: brackets apply
    if (venitNetAnual < 24300) {
      cassLunar = 2430 / 12; // 202,50 lei/lună
      cassNote = 'Sub 24.300 lei/an - minim 2.430 lei/an';
    } else if (venitNetAnual >= 24300 && venitNetAnual <= 243000) {
      cassLunar = venitNet * 0.10;
      cassNote = '24.300-243.000 lei/an - 10% din venit net';
    } else {
      cassLunar = 24300 / 12; // 2.025 lei/lună
      cassNote = 'Peste 243.000 lei/an - maxim 24.300 lei/an';
    }
  }

  // Income tax: 10% on (net income - CAS - CASS)
  const bazaImpozabila = Math.max(0, venitNet - casLunar - cassLunar);
  const impozit = bazaImpozabila * 0.10;

  // Total taxes
  const totalTaxe = casLunar + cassLunar + impozit;

  // Final profit
  const ramaneCuMine = pfaIncome.value - (pfaNormaVenit.value ? 0 : pfaExpenses.value) - totalTaxe;

  return {
    venitNet,
    cas: casLunar,
    cass: cassLunar,
    impozit,
    totalTaxe,
    ramaneCuMine: Math.max(0, ramaneCuMine),
    casNote,
    cassNote
  };
});

// SRL Calculations
const srlCalculations = computed(() => {
  // Tax on revenues (not profit!)
  const impozitVenituri = srlIncome.value * (srlImpozitCota.value / 100);
  const impozitNote = `Micro-întreprindere ${srlImpozitCota.value}% pe venituri`;

  // Contributions from salary
  const casAngajat = srlSalary.value * 0.25; // 25% CAS employee
  const cassAngajat = srlSalary.value * 0.10; // 10% CASS employee
  const contributieAngajator = srlSalary.value * 0.0225; // 2.25% employer contribution
  const impozitVenitAngajat = srlSalary.value * 0.10; // 10% income tax employee

  // Accounting profit = revenues - expenses - tax - salary cost
  const profitContabil = Math.max(0, srlIncome.value - srlExpenses.value - impozitVenituri);

  // Net salary = Gross salary - CAS - CASS - Income tax
  const salariuNet = srlSalary.value - casAngajat - cassAngajat - impozitVenitAngajat;

  // Dividends: 10% tax on accounting profit
  const taxaDividende = profitContabil * 0.10;
  const dividendeBruteDupaTaxa = profitContabil - taxaDividende;

  // CASS on dividends (if owner is NOT employed elsewhere)
  let cassDividende = 0;
  let cassDividendeNote = '';

  if (!srlProprietarSalariat.value) {
    // Calculate CASS on dividends based on brackets
    const dividendeAnuale = dividendeBruteDupaTaxa * 12;

    if (dividendeAnuale < 24300) {
      cassDividende = 2430 / 12; // 202,50 lei/lună
      cassDividendeNote = 'CASS dividende: sub 24.300 lei/an - minim';
    } else if (dividendeAnuale >= 24300 && dividendeAnuale < 48600) {
      cassDividende = dividendeBruteDupaTaxa * 0.10;
      cassDividendeNote = 'CASS dividende: 24.300-48.600 lei/an - 10%';
    } else if (dividendeAnuale >= 48600 && dividendeAnuale < 97200) {
      cassDividende = 4860 / 12; // 405 lei/lună
      cassDividendeNote = 'CASS dividende: 48.600-97.200 lei/an - fix';
    } else {
      cassDividende = 9720 / 12; // 810 lei/lună
      cassDividendeNote = 'CASS dividende: peste 97.200 lei/an - maxim';
    }
  } else {
    cassDividendeNote = 'Proprietar salariat - fără CASS pe dividende';
  }

  const dividendeNeteFinal = dividendeBruteDupaTaxa - cassDividende;

  // Total net income for owner
  const totalVenitNetProprietar = salariuNet + dividendeNeteFinal;

  // Total taxes (company + employee + dividends)
  const totalTaxe = impozitVenituri + casAngajat + cassAngajat + contributieAngajator +
                    impozitVenitAngajat + taxaDividende + cassDividende;

  return {
    profitBrut: srlIncome.value - srlExpenses.value,
    impozitProfit: impozitVenituri,
    casAngajat,
    cassAngajat,
    contributieAngajator,
    impozitVenit: impozitVenitAngajat,
    totalTaxe,
    profitDupaTaxe: profitContabil,
    salariuNet,
    taxaDividende,
    dividendeNet: dividendeNeteFinal,
    totalVenitNet: totalVenitNetProprietar,
    cotaImpozit: srlImpozitCota.value,
    impozitNote,
    cassDividende,
    cassDividendeNote
  };
});

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value || 0);
};
</script>

<style scoped>
.calculator-hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-align: center;
  padding: 4rem 20px;
}

.calculator-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.calculator-hero p {
  font-size: 1.125rem;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto;
}

.calculator-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

.entity-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.entity-btn {
  padding: 2rem;
  background: white;
  border: 3px solid #e0e0e0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-dark);
}

.entity-btn i {
  font-size: 3rem;
  color: var(--primary-color);
}

.entity-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.entity-btn.active {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(59, 130, 246, 0.05));
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.2);
}

.calculator-content {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.calculator-form h2 {
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 1.75rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
  font-size: 1rem;
}

.form-group label i {
  color: var(--primary-color);
  margin-right: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1.125rem;
  transition: all 0.3s;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.form-group small {
  display: block;
  margin-top: 0.5rem;
  color: var(--text-light);
  font-size: 0.875rem;
}

.form-group-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.form-group-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.form-group-checkbox label {
  margin: 0;
  cursor: pointer;
  font-size: 0.95rem;
}

.results-section {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 2px solid #e0e0e0;
}

.results-section h3 {
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.results-section h3 i {
  margin-right: 0.5rem;
}

.result-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
}

.result-card h4 {
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.result-card h4 i {
  color: var(--primary-color);
  margin-right: 0.5rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.result-item:last-child {
  border-bottom: none;
}

.result-label {
  flex: 1;
  color: var(--text-dark);
  font-size: 1rem;
}

.result-label small {
  display: block;
  color: var(--text-light);
  font-size: 0.85rem;
  margin-top: 0.25rem;
  font-weight: normal;
}

.result-value {
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--text-dark);
  text-align: right;
}

.result-value.deduction {
  color: #dc2626;
}

.result-value.tax {
  color: #ea580c;
}

.result-value.highlight {
  color: #16a34a;
  font-size: 1.5rem;
}

.result-item.total {
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  margin: 1rem 0;
  border: 2px solid var(--primary-color);
}

.result-item.total-taxes {
  background: #fff3e0;
  padding: 1.25rem;
  border-radius: 12px;
  margin: 1rem 0;
  border: none;
}

.result-item.net-income {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1rem 0;
  border: none;
}

.result-card.taxes {
  background: #fef3c7;
}

.result-card.annual {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.notes-section {
  margin-top: 3rem;
  display: grid;
  gap: 1.5rem;
}

.note-card {
  background: #e0f2fe;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #0284c7;
  display: flex;
  gap: 1rem;
}

.note-card.warning {
  background: #fef3c7;
  border-left-color: #f59e0b;
}

.note-card i {
  font-size: 1.5rem;
  color: #0284c7;
  margin-top: 0.25rem;
}

.note-card.warning i {
  color: #f59e0b;
}

.note-card h4 {
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.note-card p {
  margin: 0;
  color: var(--text-light);
  line-height: 1.6;
}

.note-card ul {
  margin: 0;
  padding-left: 1.5rem;
}

.note-card li {
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.cta-section {
  text-align: center;
  margin-top: 4rem;
  padding: 3rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 20px;
  color: white;
}

.cta-section h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2.5rem;
  background: white;
  color: var(--primary-color);
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .calculator-hero h1 {
    font-size: 1.75rem;
  }

  .calculator-content {
    padding: 2rem 1.5rem;
  }

  .entity-selector {
    grid-template-columns: 1fr;
  }

  .result-item {
    flex-direction: column;
    gap: 0.5rem;
  }

  .result-value {
    text-align: left;
  }

  .cta-section h3 {
    font-size: 1.5rem;
  }
}
</style>