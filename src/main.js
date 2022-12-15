import './styles/main.css';
import {ElementSearcher} from './search';
import {Options} from './options';
import {triggerEvent, removeDots} from './util';

// Options
const exactMatchElement = document.getElementById('exact-match');
const options = new Options({
  exactMatch: exactMatchElement,
});

// Search
const wordElements = document.querySelectorAll('div[class=word]');
const searcher = new ElementSearcher(wordElements);
const searchElement = document.getElementById('search');

exactMatchElement.addEventListener('change', () => search(searcher, searchElement, options.options));
searchElement.addEventListener('keyup', () => search(searcher, searchElement, options.options));

// Keyboard shortcuts
searchElement.addEventListener('keyup', (event) => {
  if (event.key === '.') searchElement.value = removeDots(searchElement.value);
});
window.addEventListener('keyup', (event) => {
  if (event.key !== '.') return;

  exactMatchElement.checked = !exactMatchElement.checked;
  triggerEvent(exactMatchElement, 'change');
});

function search(searcher, searchElement, options) {
  const query = searchElement.value.trim().toLowerCase();
  searcher.search(removeDots(query), options);
}
