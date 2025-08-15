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

const testPokemons = [
  ...allLoadedPokemons,
  null,                    // null object
  { name: '', id: null },  // invalid properties
  {},                      // empty object
];

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

  showLoaderWithDelay(400);

  try {
    const pokemons = await fetchPokemons(offset, limit);
    allLoadedPokemons = [...allLoadedPokemons, ...pokemons];

    if (!searchInput.value.trim()) {
      renderPokemonList(allLoadedPokemons);
    }

    offset += limit;
  } catch (error) {
    console.error("Error loading Pokémon:", error);
  } finally {
    hideLoader();
    loading = false;
  }
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


let loaderTimeout; // store timer id

function showLoaderWithDelay(delay = 300) {
  loaderTimeout = setTimeout(() => {
    let loader = document.createElement('div');
    loader.classList.add('loader');
    loader.id = 'loader';
    document.body.appendChild(loader);
  }, delay);
}

function hideLoader() {
  clearTimeout(loaderTimeout); // cancel timer if not triggered yet
  const loader = document.getElementById('loader');
  if (loader) loader.remove();
}

observer.observe(scrollTrigger);
loadAndRenderPokemons();
