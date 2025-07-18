import { fetchPokemons } from './api/pokeApi.js';
import { createPokemonCard } from './components/pokemonCard.js';

const pokemonList = document.getElementById('pokemonList');
const scrollTrigger = document.getElementById('infiniteScrollTrigger');

let offset = 0;
const limit = 10;
let loading = false;

async function loadAndRenderPokemons() {
  if (loading) return;
  loading = true;

  const pokemons = await fetchPokemons(offset, limit);
  const html = pokemons.map(createPokemonCard).join('');
  pokemonList.insertAdjacentHTML('beforeend', html);

  offset += limit;
  loading = false;
}

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