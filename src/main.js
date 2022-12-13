import './styles/main.css';
import {ElementSearcher} from './search';
import {Options} from './options';

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

function search(searcher, searchElement, options) {
  const query = searchElement.value.trim().toLowerCase();
  searcher.search(query, options);
}
