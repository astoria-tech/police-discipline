#!/usr/bin/env node

// This script takes the raw data file and writes a new file with an
// extended schema based on the original raw data.
// The app will read from the data file this script produces.

const fs = require("fs").promises;
const parsedJsonData = require("../backend/data/police-names.json");

const finalData = parsedJsonData.map(name => {
  // Schema definitions:
  // name: the original full name as retreived from the data source
  // searchString: a sanitized string to be used for fuzzy search
  return {
    name,
    searchString: name.replace(/'|,/gi, "")
  }
});

const writeFile = async () => {
  await fs.writeFile("../backend/data/db.json", JSON.stringify(finalData));
}

writeFile();