export function createPokemonCard(pokemon) {
  return `
    <li 
      class="pokemon-card ${pokemon.primaryType}" 
      style="
        background-color: var(--${pokemon.primaryType}-light);
        border-color: var(--${pokemon.primaryType}-dark);
      "
    >
      <div class="info-container">
        <span class="name">${pokemon.name}</span>
        <span class="number">${pokemon.formattedNumber}</span>
      </div>
      <div class="type-container">
        <ol class="types">
          ${pokemon.types
            .map(
              type => `<li class="type ${type}" style="background-color: var(--${type}-main);color: var(--${type}-darker)">${type}</li>`
            )
            .join('')}
        </ol>
      </div>
      <img src="${pokemon.image}" alt="${pokemon.name}" />
    </li>
  `;
}
