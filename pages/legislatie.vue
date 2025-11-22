<template>
  <div>
    <!-- Hero Section -->
    <section class="legislation-hero">
      <div class="container">
        <h1>Noutăți Legislative</h1>
        <p>Rămâi la curent cu cele mai recente modificări legislative din domeniul fiscal și contabil</p>
      </div>
    </section>

    <!-- Legislation Content -->
    <section class="legislation-content">
      <div class="container">
        <div class="filter-section">
          <button 
            class="filter-btn" 
            :class="{ active: currentFilter === 'all' }"
            @click="filterArticles('all')"
          >
            Toate
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: currentFilter === 'fiscal' }"
            @click="filterArticles('fiscal')"
          >
            Legislație Fiscală
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: currentFilter === 'contabil' }"
            @click="filterArticles('contabil')"
          >
            Contabilitate
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: currentFilter === 'hr' }"
            @click="filterArticles('hr')"
          >
            Resurse Umane
          </button>
        </div>

        <div class="articles-grid">
          <div 
            v-for="article in filteredArticles" 
            :key="article.id" 
            class="article-card"
          >
            <div class="article-header">
              <div>
                <div class="article-meta">
                  <span class="article-date">{{ article.date }}</span>
                  <span class="article-category">{{ getCategoryLabel(article.category) }}</span>
                </div>
                <h3 style="margin-top: 1rem;">{{ article.title }}</h3>
              </div>
            </div>
            <div class="article-body">
              <p>{{ article.summary }}</p>
              <div v-if="article.highlights && article.highlights.length > 0" class="article-highlights">
                <h4>Puncte cheie:</h4>
                <ul>
                  <li v-for="(highlight, index) in article.highlights" :key="index">
                    {{ highlight }}
                  </li>
                </ul>
              </div>
              <div v-if="article.link" class="article-footer">
                <a :href="article.link" target="_blank" class="article-link">
                  Sursa oficială <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredArticles.length === 0" class="no-articles">
          <p>Nu există articole în această categorie momentan.</p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

useHead({
  title: 'Noutăți Legislative - Accounting Business Expert',
});

const articles = ref([]);
const currentFilter = ref('all');

const loadArticles = async () => {
  try {
    const response = await fetch('/data/articles.json');
    const data = await response.json();
    articles.value = data.articles || [];
  } catch (error) {
    console.error('Error loading articles:', error);
    articles.value = [];
  }
};

const filterArticles = (category) => {
  currentFilter.value = category;
};

const filteredArticles = computed(() => {
  if (currentFilter.value === 'all') {
    return articles.value;
  }
  return articles.value.filter(article => article.category === currentFilter.value);
});

const getCategoryLabel = (category) => {
  const labels = {
    'fiscal': 'Legislație Fiscală',
    'contabil': 'Contabilitate',
    'hr': 'Resurse Umane'
  };
  return labels[category] || category;
};

onMounted(() => {
  loadArticles();
});
</script>

<style scoped>
.legislation-hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-align: center;
  padding: 4rem 20px;
}

.legislation-hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.legislation-hero p {
  font-size: 1.25rem;
  opacity: 0.9;
}

.legislation-content {
  padding: 5rem 0;
}

.filter-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--primary-color);
  background: white;
  color: var(--primary-color);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary-color);
  color: white;
}

.articles-grid {
  display: grid;
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.article-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.article-date {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.875rem;
}

.article-category {
  background: var(--primary-color);
  color: white;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.article-body {
  padding: 2rem;
}

.article-body p {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.article-highlights {
  background: var(--background-light);
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.article-highlights h4 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.article-highlights ul {
  list-style: none;
  padding: 0;
}

.article-highlights li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
}

.article-highlights li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
}

.article-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.article-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.article-link:hover {
  text-decoration: underline;
}

.no-articles {
  text-align: center;
  padding: 3rem;
  color: var(--text-light);
}

@media (max-width: 768px) {
  .legislation-hero h1 {
    font-size: 2rem;
  }

  .filter-section {
    justify-content: flex-start;
  }

  .article-header {
    flex-direction: column;
  }
}
</style>
