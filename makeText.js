/** Command-line tool to generate Markov text. */
const markov = require("./markov")

let mm = new markov.MarkovMachine("Do you love sugar cookies like I love chocolate-chip cookies")
console.log(mm.makeText())



