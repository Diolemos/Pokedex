import { fetchPokemons } from './api/pokeApi.js';
import { createPokemonCard,flipCard } from './components/pokemonCard.js';

const pokemonList = document.getElementById('pokemonList');
const scrollTrigger = document.getElementById('infiniteScrollTrigger');

let offset = 0;
const limit = 10;
let loading = false;
let allLoadedPokemons = [];
const searchInput = document.getElementById('searchInput');

async function loadAndRenderPokemons() {
  if (loading) return;
  loading = true;

  const pokemons = await fetchPokemons(offset, limit);
  allLoadedPokemons = [...allLoadedPokemons, ...pokemons];
  
  // Only render if there's no search query active
  if (!searchInput.value.trim()) {
    renderPokemonList(allLoadedPokemons);
  }

  offset += limit;
  loading = false;
}
function attachFlipListeners() {
  const cards = document.querySelectorAll('.pokemon-card');
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });
}
function renderPokemonList(pokemonArray) {
  pokemonList.innerHTML = pokemonArray.map(createPokemonCard).join('');
  attachFlipListeners();
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = allLoadedPokemons.filter(pokemon => {
    return (
      pokemon.name.toLowerCase().includes(query) ||
      pokemon.id.toString() === query
    );
  });

  renderPokemonList(filtered);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.value = '';
    renderPokemonList(allLoadedPokemons);
  }
});


// Infinite Scroll: Observe the trigger element
const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadAndRenderPokemons();
    }
  },
  {
    rootMargin: '100px',
  }
);

// Start observing and load first batch
observer.observe(scrollTrigger);
loadAndRenderPokemons();