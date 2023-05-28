export class WordLinks {

  /**
   * Creates a WordLinks.
   *
   * @param {iterable} nodes - A bunch of HTMLElement.
   */
  constructor(words) {
    this._words = new Map();
    for (const word of words) this._words.set(word.rawWord, word)

    this._queryParams = new URLSearchParams(window.location.search);

    this._boot();
  }

  /**
   * Marks all of the nodes as visible.
   *
   * @return {undefined}
   */
  showIfAny() {
    const wordToShow = this._queryParams.get('show');
    if (wordToShow === null) return;

    if (this._words.has(wordToShow)) {
      this._words.forEach(word => word.hide());
      this._words.get(wordToShow).show();
    }
  }

  _boot() {
    this.
      _words
      .forEach((word, text) => word
        .element
        .querySelector('button[class=link]')
        .addEventListener('click', () => {
          this._queryParams.set('show', text);
          window.location.search = this._queryParams.toString();
          this.showIfAny();
        })
      );
  }
}
