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


function renderPokemonList(pokemonArray) {
  

  // Handle "not found" signal
  if (
    pokemonArray.length === 1 &&
    pokemonArray[0].notFound
  ) {
    pokemonList.innerHTML = `<div class="not-found">No Pokémon found 😢</div>`;
    return;
  }

  pokemonList.innerHTML = pokemonArray.map(createPokemonCard).join('');
  attachFlipListeners();
}

function attachFlipListeners() {
  document.querySelectorAll('.pokemon-card').forEach(card =>
    card.addEventListener('click', flipCard)
  );
}

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

// ✅ Set up search (this will replace the old event listeners)
setupSearch(searchInput, ()=>allLoadedPokemons, renderPokemonList);

// ♾️ Infinite scroll 
const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadAndRenderPokemons();
    }
  },
  { rootMargin: '100px' }
);

const testPokemons = [
  ...allLoadedPokemons,
  null,                    // null object
  { name: '', id: null },  // invalid properties
  {},                      // empty object
];
observer.observe(scrollTrigger);
loadAndRenderPokemons();
