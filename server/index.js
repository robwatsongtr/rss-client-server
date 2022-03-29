// Back end for RSS feed into express 

const express = require('express');
const app = express()
const router = express.Router();
const port = 5000;
const cors = require("cors")
const mongoose = require('mongoose')

app.use(cors())
app.use(router); 

const Parser = require('rss-parser');
const parser = new Parser();

// mongoDB / mongoose initializaton 
mongoose.connect('mongodb://127.0.0.1:27017/rss_feeds_db', { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


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
  'https://thelaborreport.substack.com/feed',
  'https://www.reddit.com/.rss'
]

// home endpoint 
const apiRunning = (req, res) => {
  res.send("Api running! Better catch it");
}
router.get('/', apiRunning);

// get feeds to the front end from the test array.
router.get('/rssTest',  (req, res) => {

  const feedPromises = feedURls.map( fds => parser.parseURL(fds) );

  Promise.all(feedPromises)
    .then( feedsToFrontEnd => { 
      res.json(feedsToFrontEnd);
    })
    .catch( err => {
      res.status(500)
      res.json(err)
    })
})

app.listen( port, () => {
  console.log(`Server running on port ${port}`);
})
