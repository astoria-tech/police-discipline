const express = require('express');
const db = require('./db');
const fuse = require('./middleware/fuse');

const host = '0.0.0.0';
const port = 3001;

const app = express();
app.use(fuse(db));

app.get('/api/v1/police/:name', async (req, res) => {
  const results = req.fuse.search(req.params.name).filter(el => {
    return el.score < 0.5; // Where lower scores are closer matches
  })
  .slice(0, 20);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(results);
});

app
  .listen(
    port,
    host,
    () => console.log(`Police discipline app listening at http://${host}:${port}`)
  );
