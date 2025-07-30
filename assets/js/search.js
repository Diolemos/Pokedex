export function setupSearch(inputElement, allPokemonsRef, renderCallback) {
  inputElement.addEventListener('input', () => {
    const query = inputElement.value.trim().toLowerCase();

    const filtered = allPokemonsRef().filter(pokemon => {
      return (
        pokemon.name.toLowerCase().includes(query) ||
        pokemon.id.toString() === query
      );
    });

    renderCallback(filtered);
  });

  inputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      inputElement.value = '';
      renderCallback(allPokemonsRef());
    }
  });
}