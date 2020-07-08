const fs = require("fs");

const getData = () => {
  const filepath = './data/db.json';

  try {
    const jsonData = fs.readFileSync(`${filepath}`, 'utf8');
    const parsedData = JSON.parse(jsonData);
    
    return parsedData;
  } catch (error) {
    if (err.code === 'ENOENT') {
      console.log(`${filepath} file not found!`);
    } else if (err.code == 'EACCES') {
      console.log(`Not allowed to read ${filepath}`);
      
    } 
      
    throw error;
  }
}

module.exports = getData();