/**
 * Creates a debounced version of a function.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - Time in milliseconds to wait before calling the function.
 * @returns {Function} - The debounced function.
 */
export function debounce(func, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}