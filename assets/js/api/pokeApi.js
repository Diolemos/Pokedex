import { Pokemon } from '../models/pokemon.js';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

/**
 * Converts detailed API response into a Pokemon instance
 */
function transformToPokemon(data) {
  const types = data.types.map(slot => slot.type.name);
  
  const stats = {};
  for (const s of data.stats) {
    const name = s.stat.name;
    if (['hp', 'attack', 'defense', 'speed'].includes(name)) {
      stats[name] = s.base_stat;
    }
  }

  return new Pokemon({
    id: data.id,
    name: data.name,
    types,
    image: data.sprites.other['official-artwork'].front_default,
    stats
  });
}

/**
 * Fetches detailed info for a single Pokémon by its URL
 */
async function fetchPokemonDetail(url) {
  const response = await fetch(url);
  const data = await response.json();
  return transformToPokemon(data);
}

/**
 * Fetches a page of Pokémon, then fetches details for each one
 */
export async function fetchPokemons(offset = 0, limit = 10) {
  const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
  const data = await response.json();

  const detailPromises = data.results.map(pokemon => fetchPokemonDetail(pokemon.url));
  const pokemons = await Promise.all(detailPromises);
  return pokemons;
}
/*
*
* 
*/
export async function fetchPokemonByIdOrName(idOrName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  const data = await response.json();
  return transformToPokemon(data);
}