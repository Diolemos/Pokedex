import { fetchPokemons } from './api/pokeApi.js';
import { createPokemonCard, flipCard } from './components/pokemonCard.js';
import { setupSearch } from './search.js';

const pokemonList = document.getElementById('pokemonList');
const scrollTrigger = document.getElementById('infiniteScrollTrigger');
const searchInput = document.getElementById('searchInput');

let offset = 0;
const limit = 10;
let loading = false;
let allLoadedPokemons = [];

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

// Setup search module
setupSearch(
  searchInput,
  () => allLoadedPokemons,
  renderPokemonList
);

//  Infinite Scroll
const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadAndRenderPokemons();
    }
  },
  { rootMargin: '100px' }
);

observer.observe(scrollTrigger);
loadAndRenderPokemons();