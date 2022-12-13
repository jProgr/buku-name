import {stringToBool} from './util';

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
    this._exactMatchElement = elements.exactMatch;

    this.options = {
      exactMatch: this._exactMatchElement.checked,
    };

    this._boot();
  }

  /**
   * Does some extra work to initialize the object.
   *
   * @return {undefined}
   */
  _boot() {
    this._initFromCache();

    // When elements are updated, update the internal state.
    this._exactMatchElement.addEventListener('change', () => {
      this.options.exactMatch = this._exactMatchElement.checked;
      this._updateCache();
    });
  }

  /**
   * Update the values in this.options with the ones in localStorage,
   * if any.
   *
   * @return {undefined}
   */
  _initFromCache() {
    if (!this._isLocalStorageAvailable()) return;

    let exactMatch = window.localStorage.getItem('exactMatch');
    if (exactMatch !== null) {
      exactMatch = stringToBool(exactMatch);
      this._exactMatchElement.checked = exactMatch;
      this.options.exactMatch = exactMatch;
    }
  }

  /**
   * Takes the values from this.options and writes them to localStorage.
   *
   * @return {undefined}
   */
  _updateCache() {
    if (!this._isLocalStorageAvailable()) return;

    for (const [key, value] of Object.entries(this.options)) window.localStorage.setItem(key, value);
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
}
