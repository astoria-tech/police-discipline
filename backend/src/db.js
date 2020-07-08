const fs = require("fs");

const getData = () => {
  const jsonData = fs.readFileSync('./data/db.json', 'utf8');
  const parsedData = JSON.parse(jsonData);

  return parsedData;
}

module.exports = getData();