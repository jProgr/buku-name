import {isUpperCase} from './util';

/**
 * Enum for word types.
 *
 * @readonly
 * @enum {Symbol}
 */
export const WordType = Object.freeze({
  BASE: Symbol('base'),
  COMPOUND: Symbol('compound'),
  OTHER: Symbol('other'),
});

const parenthesesRegex = /\([\w\d\s\'\-,]+\)/gi;

export class Word {

  /**
   * Creates a Word.
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    this._element = element;
    this.contents = this._getContent(element.innerText);
    [this.word] = this.contents;
    this.type = this._getType(this.word);
  }

  /**
   * Returns the type of word by looking at the string.
   *
   * @param {string} word
   * @return {WordType}
   */
  _getType(word) {
    if (isUpperCase(word.substring(0, 1))) return WordType.OTHER;
    if (word.includes('-')) return WordType.COMPOUND;

    return WordType.BASE;
  }

  /**
   * Returns a set with the word and its meanings.
   *
   * @param {string} string
   * @return {Set} Of strings.
   */
  _getContent(string) {
    let contents = new Set();

    string
      .replaceAll(parenthesesRegex, '')
      .split(/[^\w-]/)
      .map(word => word.trim())
      .forEach(word => contents.add(word.toLowerCase()));
    if (contents.has('')) contents.delete('');

    return contents;
  }

  /**
   * Marks element as visible.
   *
   * @return {undefined}
   */
  show() {
    this._element.style.display = 'block';
  }

  /**
   * Marks element as invisible.
   *
   * @return {undefined}
   */
  hide() {
    this._element.style.display = 'none';
  }

  /**
   * Whether this word is of any of the listed types.
   *
   * @param  {...WordType} types
   * @return {boolean}
   */
  is(...types) {
    return types.includes(this.type);
  }
}
