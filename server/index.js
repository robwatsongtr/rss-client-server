// Back end for RSS feed into express 

const express = require('express');
const app = express()
const router = express.Router();
const port = 5000;
const cors = require("cors")

app.use(cors())
app.use(router); 

const Parser = require('rss-parser');
const parser = new Parser();

const apiRunning = (req, res) => {
  res.send("Api running! Better catch it");
}

// home endpoint 
router.get('/', apiRunning);

// get a feed for testing and development purposes 
router.get('/rssTest', (req, res) => {

  (async () => {
    let feed = await parser.parseURL('https://www.reddit.com/.rss' );
    res.send(feed);  
  }) ();
   
})






app.listen( port, () => {
  console.log(`Server running on port ${port}`);
})
