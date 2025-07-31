import allPokemons from '../data/pokemonList.js'; // list with { id, name }
import { fetchPokemonByIdOrName } from './api/pokeApi.js';
import { debounce } from './utils.js'; // assuming you have one

export function setupSearch(inputElement, getLoadedPokemons, renderCallback) {
  const performSearch = async () => {
    const query = inputElement.value.trim().toLowerCase();

    // ESC: reset search
    if (!query) {
      renderCallback(getLoadedPokemons());
      return;
    }

    // Filter static list
    const matches = allPokemons
      .filter(p =>
        p.name && p.name.includes(query) ||
        (p.id !== undefined && p.id.toString() === query)
      )
      .slice(0, 10); // Limit to 10 results

    if (matches.length === 0) {
      renderCallback([
        {
          notFound: true,
        },
      ]);
      return;
    }

    try {
      console.log('Search query:', query);
console.log('Filtered matches:', matches);
console.log("Requesting IDs:", matches.map(p => p.id));
      const results = await Promise.allSettled(
        matches.map(p => fetchPokemonByIdOrName(p.name))
      );

      const validPokemons = results
        .filter(res => res.status === 'fulfilled')
        .map(res => res.value);

      if (validPokemons.length === 0) {
        renderCallback([
          {
            notFound: true,
          },
        ]);
        return;
      }

      renderCallback(validPokemons);
    } catch (error) {
      console.error('Search error:', error);
      renderCallback([
        {
          notFound: true,
        },
      ]);
    }
  };

  const debouncedSearch = debounce(performSearch, 400);

  inputElement.addEventListener('input', debouncedSearch);

  inputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      inputElement.value = '';
      renderCallback(getLoadedPokemons());
    }
  });
}