import {triggerEvent, removeDots, isElementFocused} from './util';

/**
 * Boots keyboard shortcuts.
 */
export class Shortcuts {

  /**
   * Creates a Shortcuts object.
   *
   * @param {HTMLElement} searchElement - A text input.
   * @param {HTMLElement} exactMatchElement - A checkbox.
   */
  constructor(searchElement, exactMatchElement) {
    this._searchElement = searchElement;
    this._exactMatchElement = exactMatchElement;

    this._bootExactMatchToggle();
    this._bootFocusSearch();
    this._bootClearSearch();
  }

  /**
   * Boots the dot key to toggle this._exactMatchElement checked state.
   *
   * @return {undefined}
   */
  _bootExactMatchToggle() {
    this._searchElement.addEventListener('keyup', (event) => {
      if (event.key === '.') this._searchElement.value = removeDots(this._searchElement.value);
    });

    window.addEventListener('keyup', (event) => {
      if (event.key !== '.') return;

      this._exactMatchElement.checked = !this._exactMatchElement.checked;
      triggerEvent(this._exactMatchElement, 'change');
    });
  }

  /**
   * Boots the f key to focus this._searchElement.
   *
   * @return {undefined}
   */
  _bootFocusSearch() {
    window.addEventListener('keyup', (event) => {
      if (event.key !== 'f') return;
      if (isElementFocused(this._searchElement)) return;

      this._searchElement.focus();
    });
  }

  /**
   * Boots the less than key to clear the text inside this._searchElement.
   *
   * @return {undefined}
   */
  _bootClearSearch() {
    window.addEventListener('keyup', (event) => {
      if (event.key !== '<') return;

      this._searchElement.value = '';
      triggerEvent(this._searchElement, 'keyup');
    });
  }
}
