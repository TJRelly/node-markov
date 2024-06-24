/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function makeURLText(url) {
  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data);
}

if (process.argv[2] === "file") makeText(process.argv[3]);
else if (process.argv[2] === "url")
  makeURLText(process.argv[3]);
