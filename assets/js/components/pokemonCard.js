export function createPokemonCard(pokemon) {
  return `
    <li class="pokemon-card ${pokemon.primaryType}">
      <div class="info-container">
        <span class="name">${pokemon.name}</span>
        <span class="number">${pokemon.formattedNumber}</span>
      </div>
      <div class="type-container">
        <ol class="types">
          ${pokemon.types
            .map(type => `<li class="type ${type}">${type}</li>`)
            .join('')}
        </ol>
      </div>
      <img src="${pokemon.image}" alt="${pokemon.name}" />
    </li>
  `;
}
   
       
     
