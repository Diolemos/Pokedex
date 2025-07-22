export function createPokemonCard(pokemon) {
  return `
    <li 
      class="pokemon-card ${pokemon.primaryType}" 
      data-id="${pokemon.id}"
      style="
        background-color: var(--${pokemon.primaryType}-light);
        border-color: var(--${pokemon.primaryType}-dark);
      "
    >

      <!-- Front -->
      <div class="card-front">
        <div class="info-container">
          <span class="name">${pokemon.name}</span>
          <span class="number">${pokemon.formattedNumber}</span>
        </div>
        <div class="type-container">
          <ol class="types">
            ${pokemon.types
              .map(
                type => `
                  <li 
                    class="type ${type}" 
                    style="
                      background-color: var(--${type}-main);
                      color: var(--${type}-darker)
                    "
                  >
                    ${type}
                  </li>`
              )
              .join('')}
          </ol>
        </div>
        <img src="${pokemon.image}" alt="${pokemon.name}" />
      </div>

      <!-- Back -->
      <div class="card-back">
        <h3>Stats</h3>
        <ul class="stats">
          <li>HP: ${pokemon.stats.hp}</li>
          <li>Attack: ${pokemon.stats.attack}</li>
          <li>Defense: ${pokemon.stats.defense}</li>
          <li>Speed: ${pokemon.stats.speed}</li>
        </ul>
      </div>

    </li>
  `;
}
export function flipCard(event) {
  const card = event.currentTarget;
  card.classList.toggle('flipped');
}