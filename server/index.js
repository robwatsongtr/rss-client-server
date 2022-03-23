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

const feedURls = ['https://jewishcurrents.org/partner.xml', 
  'https://readpassage.com/feed/', 
  'http://popula.com/feed/', 
  'https://riftmag.org/interviews?format=rss', 
  'https://lbo-news.com/feed/',
  'https://ctmirror.org/feed/?partner-feed=optout', 
  'https://www.sicknote.co/feed',
  'https://therednation.org/feed/', 
  'https://themarkup.org/feeds/rss.xml', 
  'https://www.canopycanopycanopy.com/feed',
  'https://thelaborreport.substack.com/feed'
  ]

const apiRunning = (req, res) => {
  res.send("Api running! Better catch it");
}

// home endpoint 
router.get('/', apiRunning);

// get a feed for testing and development purposes 
router.get('/rssTest', (req, res) => {

  (async () => {
    let feed = await parser.parseURL('https://inthesetimes.com/partner.xml');
    res.json(feed);  
  }) ();
   
})

// make an endpoint that serves multiple feeds to front end 


app.listen( port, () => {
  console.log(`Server running on port ${port}`);
})


