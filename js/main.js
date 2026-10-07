// Entry point: wires the modules together once the DOM is ready.
function init() {
  document.documentElement.classList.add('js-ready');
}

document.addEventListener('DOMContentLoaded', init);
