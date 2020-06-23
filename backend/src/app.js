const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs/promises');

const host = '0.0.0.0';
const port = 3001;

const app = express();

app.get('/api/v1/police/:name', async (req, res) => {
  try {
    const data = await (fs.readFile('./data/police-names.json', 'utf8'));
    const results = JSON.parse(data)
      .filter((name, index) => name.includes(req.params.name))
      .slice(0, 9);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(results);
  } catch (error) {
    res.json(error);
  }
});

app
  .listen(
    port,
    host,
    () => console.log(`Police discipline app listening at http://${host}:${port}`)
  );
