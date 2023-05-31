import './styles/main.css';
import {WordSearcher} from './search';
import {Options} from './options';
import {removeShortcutKeys, triggerEvent} from './util';
import {Shortcuts} from './shortcuts';
import {Word} from './word';
import {WordLinks} from './links';

// Options.
const options = new Options({
  exactMatch: document.getElementById('exact-match-element'),
  base: document.getElementById('base-element'),
  compound: document.getElementById('compound-element'),
  other: document.getElementById('other-element'),
  showInfo: document.getElementById('show-info-element'),
  justMini: document.getElementById('just-mini-element'),
});

// Search.
const words = Array
  .from(document.querySelectorAll('div[class=word-container]'))
  .map(element => new Word(element));
const searcher = new WordSearcher(words);
const searchElement = document.getElementById('search');
searchElement.value = '';

const searchCallback = event => {
  if (event !== undefined && event.srcElement.id === 'show-info-element') return;

  search(searcher, searchElement, options);
};
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

// Audio.
words
  .forEach(word => {
    const button = word.element.querySelector('button[class=listen]');
    if (button === null) return;

    let audioElement = null;
    let mp4Source;
    let oggSource;
    let mp3Source;

    button.addEventListener('click', () => {
      if (audioElement !== null) {
        audioElement.play();
        return;
      }

      audioElement = document.createElement('audio');

      mp4Source = document.createElement('source');
      mp4Source.type = 'audio/mp4';
      mp4Source.src = 'assets/audio/' + word.rawWord + '.m4a';
      audioElement.appendChild(mp4Source);

      oggSource = document.createElement('source');
      oggSource.type = 'audio/ogg';
      oggSource.src = 'assets/audio/' + word.rawWord + '.oga';
      audioElement.appendChild(oggSource);

      mp3Source = document.createElement('source');
      mp3Source.type = 'audio/mpeg';
      mp3Source.src = 'assets/audio/' + word.rawWord + '.mp3';
      audioElement.appendChild(mp3Source);

      audioElement.play();
    });
  });

// Shortcuts.
new Shortcuts(searchElement, ...options.elements);

// Toggle info.
const wordInfoElements = document.querySelectorAll('div[class=word-info]');
const showInfoElement = document.getElementById('show-info-element');
showInfoElement.addEventListener('change', event => {
  const shouldShow = event.srcElement.checked;
  wordInfoElements.forEach(element => element.style.display = shouldShow ? 'block' : 'none')
});
triggerEvent(showInfoElement, 'change');

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
