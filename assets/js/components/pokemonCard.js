export function createPokemonCard(pokemon) {
  return `
    <li class="pokemon ${pokemon.primaryType}">
      <span class="number">${pokemon.formattedNumber}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types
            .map(type => `<li class="type ${type}">${type}</li>`)
            .join('')}
        </ol>

        <img src="${pokemon.image}" alt="${pokemon.name}" />
      </div>
    </li>
  `;
}