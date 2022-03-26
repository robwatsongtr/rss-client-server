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

  const feedsLoop = async () => {

    // create array of promises.
    // I want to put into a try catch block but not sure how.
    const feedPromises = feedURls.map( async (fds) => {
      const returnedFeeds = await parser.parseURL(fds);
      return returnedFeeds;
    })
  
    // now we wait for the array of promises to get resolved
    const allFeeds = await Promise.all(feedPromises);
   
    return allFeeds
  }
  
  let feedsToFrontEnd = feedsLoop()
  
  res.json(feedsToFrontEnd)
   
})

// make an endpoint that serves multiple feeds to front end 


app.listen( port, () => {
  console.log(`Server running on port ${port}`);
})


// (async () => {
//   let feed = await parser.parseURL('https://inthesetimes.com/partner.xml');
//   res.json(feed);  
// }) ();