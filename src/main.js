import './styles/main.css';
import {WordSearcher} from './search';
import {Options} from './options';
import {removeShortcutKeys} from './util';
import {Shortcuts} from './shortcuts';
import {Word} from './word';

// Options.
const options = new Options({
  exactMatch: document.getElementById('exact-match-element'),
  base: document.getElementById('base-element'),
  compound: document.getElementById('compound-element'),
});

// Search.
const words = Array
  .from(document.querySelectorAll('p[class=word-container]'))
  .map(element => new Word(element));
const searcher = new WordSearcher(words);
const searchElement = document.getElementById('search');

const searchCallback = () => search(searcher, searchElement, options);
options.onChange(searchCallback);
searchElement.addEventListener('keyup', searchCallback);

// Shortcuts.
new Shortcuts(searchElement, ...options.elements);

function search(searcher, searchElement, options) {
  debounce(() => searcher.search(
    removeShortcutKeys(searchElement.value.trim().toLowerCase()),
    options
  ))();
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
