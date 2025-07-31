export function createPokemonCard(pokemon) {
 if (!pokemon || !pokemon.name || !pokemon.id) {
  
  //TODO: STYLE THE ".POKEMON-CARD ERROR" SELECTOR
  
  return  (` 
      <li 
        class="pokemon-card  missingno" 
        style="
          background-color: var(--normal-light, #ccc);
          border-color: var(--normal-dark, #888);
        "
      >
        <div class="card-front">
          <div class="info-container">
            <span class="name">MissingNo</span>
            <span class="number">#00</span>
          </div>
          <div class="type-container">
            <ol class="types">
              <li class="type unknown" style="background-color: #555; color: #fff">
                ??
              </li>
            </ol>
          </div>
          <img src="assets/images/MissingNo.jpg" alt="MissingNo" />
        </div>

        <div class="card-back">
          <h3>Stats</h3>
          <ul class="stats">
            <li><span>HP:</span>  <span>??</span> </li>
            <li><span>Attack:</span>  <span>??</span></li>
            <li><span>Defense:</span> <span>??</span></li>
            <li><span>Speed:</span>  <span>??</span></li>
          </ul>
        </div>
      </li>
    `);
  }
  
  return( `
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
          <li><span>HP:</span>  <span> ${pokemon.stats.hp} </span> </li>
          <li><span>Attack:</span>  <span> ${pokemon.stats.attack} </span></li>
          <li><span>Defense:</span> <span> ${pokemon.stats.defense} </span></li>
          <li><span>Speed:</span>  <span> ${pokemon.stats.speed} </span></li>
        </ul>
      </div>

    </li>
  `);
}
export function flipCard(event) {
  const card = event.currentTarget;
  card.classList.toggle('flipped');
}