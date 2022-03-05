// Back end for RSS feed into express 

const express = require('express');
const app = express()
const router = express.Router();
const port = 5000;

const Parser = require('rss-parser');
const parser = new Parser();

const apiRunning = (req, res) => {
  res.send("Api running! Better catch it");
}

// home endpoint 
router.get('/', apiRunning);

// get a feed 
router.get('/rss', (req, res) => {

  (async () => {
    let feed = await parser.parseURL('https://fair.org/feed/');
    res.json(feed);  
  }) ();
   
})

// mount router 
app.use(router); 


app.listen( port, () => {
  console.log(`Server running on port ${port}`);
})
