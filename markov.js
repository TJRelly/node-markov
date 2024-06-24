/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    //key: word for this.words
    //value: array of words that follow the key
    //word can only appear once
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains[word]) {
        chains[word].push(nextWord);
      } else {
        chains[word] = nextWord ? [nextWord] : [null];
      }
    }

    this.chains = chains;
  }

  /** return random text from chains */
  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    const keys = Object.keys(this.chains);
    let key = MarkovMachine.choice(keys);
    let output = [];

    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.choice(this.chains[key]);
    }

    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
