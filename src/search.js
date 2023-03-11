/**
 * Handles the visibility of a set of DOM elements
 * according to a search query.
 */
export class WordSearcher {

  /**
   * Creates an WordSearcher.
   *
   * @param {iterable} nodes - A bunch of HTMLElement.
   */
  constructor(words) {
    this._words = words;
  }

  /**
   * Performs a search in the text nodes of this_nodes by
   * showing or hiding the elements.
   *
   * @param {string} query
   * @return {undefined}
   */
  search(query, options) {
    if (!query) {
      this.showAll(options);
      return;
    }

    this._words.forEach(word => {
      // Hide if the word type is not active.
      if (!word.is(...options.getActiveTypes())) return word.hide();

      // Check for exact match.
      if (options.isExactMatchActive()) {
        return this._showOrHide(word, word.contents.has(query))
      }

      // Partial match.
      for (const meaning of word.contents) if (meaning.includes(query)) return word.show();

      // If none.
      word.hide();
    });
  }

  /**
   * Marks all of the nodes as visible.
   *
   * @return {undefined}
   */
  showAll(options) {
    this._words.forEach(word => this._showOrHide(
      word,
      word.is(...options.getActiveTypes())
     ));
  }

  _showOrHide(word, shouldShow) {
    if (shouldShow) word.show();
    else word.hide();
  }
}
