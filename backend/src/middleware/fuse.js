const Fuse = require('fuse.js');

const configureFuse = (req, next, db) => {
  const fuse = new Fuse(db, {
    includeScore: true, 
    minMatchCharLength: 2, 
    shouldSort: true,
    distance: 10,
    keys: ["searchString"]
  });

  req.fuse = fuse;
  next();
} 

const returnMiddleware = (db) => {
  return (req, _res, next) => {
    configureFuse(req, next, db);
  }
};

module.exports = returnMiddleware;