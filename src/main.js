import './styles/main.css';
import {ElementSearcher} from './search';

// Search
const wordElements = document.querySelectorAll('div[class=word]');
const searcher = new ElementSearcher(wordElements);
const searchElement = document.getElementById('search');

// Options
const exactMatchElement = document.getElementById('exact-match');
let options = {
  exactMatch: exactMatchElement.checked,
};
exactMatchElement.addEventListener('change', () => {
  options.exactMatch = exactMatchElement.checked
  search(searcher, searchElement, options);
});

searchElement.addEventListener('keyup', () => search(searcher, searchElement, options));

function search(searcher, searchElement, options) {
  const query = searchElement.value.trim().toLowerCase();
  searcher.search(query, options);
}
