import {
  triggerEvent,
  isElementFocused,
  removeExactMatchKey,
  removeBaseToggleKey,
  removeCompoundToggleKey,
  removeOtherToggleKey,
} from './util';

export const ShortcutKey = Object.freeze({
  EXACT_MATCH: '.',
  FOCUS_SEARCH: 'f',
  CLEAR_SEARCH: '<',
  BASE_TOGGLE: '?',
  COMPOUND_TOGGLE: ',',
  OTHER_TOGGLE: '_',
});

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
  constructor(
    searchElement,
    exactMatchElement,
    baseElement,
    compoundElement,
    otherElement,
  ) {
    this._searchElement = searchElement;
    this._exactMatchElement = exactMatchElement;
    this._baseElement = baseElement;
    this._compoundElement = compoundElement;
    this._otherElement = otherElement;

    this._bootExactMatchToggle();
    this._bootFocusSearch();
    this._bootClearSearch();
    this._bootBaseToggle();
    this._bootCompoundToggle();
    this._bootOtherToggle();
  }

  /**
   * Boots the dot key to toggle this._exactMatchElement checked state.
   *
   * @return {undefined}
   */
  _bootExactMatchToggle() {
    this._searchElement.addEventListener('keyup', (event) => {
      if (event.key === ShortcutKey.EXACT_MATCH) {
        this._searchElement.value = removeExactMatchKey(this._searchElement.value);
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.key !== ShortcutKey.EXACT_MATCH) return;

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
      if (event.key !== ShortcutKey.FOCUS_SEARCH) return;
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
      if (event.key !== ShortcutKey.CLEAR_SEARCH) return;

      this._searchElement.value = '';
      triggerEvent(this._searchElement, 'keyup');
    });
  }

  _bootBaseToggle() {
    this._searchElement.addEventListener('keyup', (event) => {
      if (event.key === ShortcutKey.BASE_TOGGLE) this._searchElement.value = removeBaseToggleKey(this._searchElement.value);
    });

    window.addEventListener('keyup', (event) => {
      if (event.key !== ShortcutKey.BASE_TOGGLE) return;

      this._baseElement.checked = !this._baseElement.checked;
      triggerEvent(this._baseElement, 'change');
    });
  }

  _bootCompoundToggle() {
    this._searchElement.addEventListener('keyup', (event) => {
      if (event.key === ShortcutKey.COMPOUND_TOGGLE) this._searchElement.value = removeCompoundToggleKey(this._searchElement.value);
    });

    window.addEventListener('keyup', (event) => {
      if (event.key !== ShortcutKey.COMPOUND_TOGGLE) return;

      this._compoundElement.checked = !this._compoundElement.checked;
      triggerEvent(this._compoundElement, 'change');
    });
  }

  _bootOtherToggle() {
    this._searchElement.addEventListener('keyup', (event) => {
      if (event.key === ShortcutKey.OTHER_TOGGLE) this._searchElement.value = removeOtherToggleKey(this._searchElement.value);
    });

    window.addEventListener('keyup', (event) => {
      if (event.key !== ShortcutKey.OTHER_TOGGLE) return;

      this._otherElement.checked = !this._otherElement.checked;
      triggerEvent(this._otherElement, 'change');
    });
  }
}
