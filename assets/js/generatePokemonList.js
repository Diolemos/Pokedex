const fs = require('fs');
const https = require('https');

const url = 'https://pokeapi.co/api/v2/pokemon?limit=2000';

https.get(url, (res) => {
  let data = '';

  res.on('data', chunk => (data += chunk));
  res.on('end', () => {
    const results = JSON.parse(data).results;

    const pokemonList = results.map(pokemon => {
      const parts = pokemon.url.split('/');
      const id = parseInt(parts[parts.length - 2]);
      return { id, name: pokemon.name };
    });

    fs.writeFileSync('pokemonList.json', JSON.stringify(pokemonList, null, 2));
    console.log('✅ Pokémon list saved to pokemonList.json');
  });
}).on('error', err => {
  console.error('❌ Error fetching Pokémon list:', err);
});