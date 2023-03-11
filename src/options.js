import {stringToBool} from './util';
import {WordType} from './word';

/**
 * Handles search options, storage in localStorage,
 * retrieval, and updates.
 */
export class Options {

  /**
   * Creates an Options.
   *
   * @param {object} elements - An object with HTMLElement.
   */
  constructor(elements) {
    this._elements = elements;

    this._initFromCache();
    this.onChange(() => this._updateCache());
  }

  isExactMatchActive() {
    return this._elements.exactMatch.checked;
  }

  isBaseActive() {
    return this._elements.base.checked;
  }

  isCompoundActive() {
    return this._elements.compound.checked;
  }

  get elements() {
    return Object
      .entries(this._elements)
      .map(keyValuePair => keyValuePair[1]);
  }

  /**
   * Update the values in this._options with the ones in localStorage,
   * if any.
   *
   * @return {undefined}
   */
  _initFromCache() {
    if (!this._isLocalStorageAvailable()) return;

    const exactMatch = window.localStorage.getItem('exactMatch');
    if (exactMatch !== null) this._elements.exactMatch.checked = stringToBool(exactMatch);

    const base = window.localStorage.getItem('base');
    if (base !== null) this._elements.base.checked = stringToBool(base);

    const compound = window.localStorage.getItem('compound');
    if (compound !== null) this._elements.compound.checked = stringToBool(compound);
  }

  /**
   * Takes the values from this._options and writes them to localStorage.
   *
   * @return {undefined}
   */
  _updateCache() {
    if (!this._isLocalStorageAvailable()) return;

    for (const [key, element] of Object.entries(this._elements)) {
      window.localStorage.setItem(key, element.checked)
    }
  }

  /**
   * Whether localStorage is available in this browser.
   *
   * @return {boolean}
   */
  _isLocalStorageAvailable() {
    let storage;
    try {
        storage = window.localStorage;
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);

        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
  }

  getActiveTypes() {
    let types = [];

    if (this.isBaseActive()) types.push(WordType.BASE);
    if (this.isCompoundActive()) types.push(WordType.COMPOUND);

    return types;
  }

  onChange(callback) {
    Object
      .values(this._elements)
      .forEach(element => element.addEventListener('change', callback));
  }
}
