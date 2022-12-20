import './styles/main.css';
import {ElementSearcher} from './search';
import {Options} from './options';
import {removeDots} from './util';
import {Shortcuts} from './shortcuts';

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
new Shortcuts(searchElement, exactMatchElement);

function search(searcher, searchElement, options) {
  const query = searchElement.value.trim().toLowerCase();
  searcher.search(removeDots(query), options);
}
