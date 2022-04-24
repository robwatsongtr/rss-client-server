
// Utilizing Async Await in a loop to return a bunch of stuff 
// server edition 

const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const port = 5000;
const cors = require("cors")
const Parser = require('rss-parser');
const parser = new Parser();

app.use(cors())
app.use(bodyParser.json())
app.use(require("express-chrome-logger"));

const feedURls = ['https://jewishcurrents.org/partner.xml', 
  'https://readpassage.com/feed/', 
  'http://popula.com/feed/',  
  'https://riftmag.org/interviews?format=rss' 
  // 'https://lbo-news.com/feed/',
  // 'https://ctmirror.org/feed/?partner-feed=optout', 
  // 'https://www.sicknote.co/feed',
  // 'https://therednation.org/feed/', 
  // 'https://themarkup.org/feeds/rss.xml', 
  // 'https://www.canopycanopycanopy.com/feed',
  // 'https://thelaborreport.substack.com/feed'
]

app.get('/', (req, res) => {
  res.console.log("Hello from your server :)");
  res.send("hello from your browser")
  
})

app.get('/rssTest',  (req, res) => {
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

app.listen( port, "0.0.0.0", () => 
   console.log(`\nServer started on port: http://localhost:${port}\n`)
)


// const feedsLoop = async () => {

//   // create array of promises.
//   // I want to put into a try catch block but not sure how.
//   const feedPromises = feedURls.map( async (fds) => {
//     const returnedFeeds = await parser.parseURL(fds);
//     return returnedFeeds;
//   })

//   // now we wait for the array of promises to get resolved
//   const allFeeds = await Promise.all(feedPromises);
//   console.log( allFeeds ) 

// }

// feedsLoop()
 