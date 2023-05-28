import './styles/main.css';
import {WordSearcher} from './search';
import {Options} from './options';
import {removeShortcutKeys} from './util';
import {Shortcuts} from './shortcuts';
import {Word} from './word';
import {WordLinks} from './links';

// Options.
const options = new Options({
  exactMatch: document.getElementById('exact-match-element'),
  base: document.getElementById('base-element'),
  compound: document.getElementById('compound-element'),
  other: document.getElementById('other-element'),
  justMini: document.getElementById('just-mini-element'),
});

// Search.
const words = Array
  .from(document.querySelectorAll('div[class=word-container]'))
  .map(element => new Word(element));
const searcher = new WordSearcher(words);
const searchElement = document.getElementById('search');
searchElement.value = '';

const searchCallback = () => search(searcher, searchElement, options);
options.onChange(searchCallback);

const ignoredKeys = [
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'ArrowLeft',
  'Shift',
  'Control',
  'Alt',
  'CapsLock',
  'Meta',
];
searchElement.addEventListener('keyup', event => {
  if (ignoredKeys.includes(event.key)) return;
  searchCallback();
});

// Word links.
new WordLinks(words).showIfAny();

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
