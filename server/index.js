// Back end for RSS feed into express 

const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const router = express.Router();
const port = 5000;
const cors = require("cors")
const mongoose = require('mongoose')
const Parser = require('rss-parser');
const parser = new Parser();

// middleware 
const feedTestRoutes = express.Router();
app.use(cors())
app.use(bodyParser.json());
app.use(router); 

// THE HTTP PATH
app.use('/mongoTest', feedTestRoutes) 

// the test db model 
let feedTest = require('./feed_test_model')

// mongoDB / mongoose initializaton 
mongoose.connect('mongodb://127.0.0.1:27017/rss_feeds_db', { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// home (test) endpoint 
const apiRunning = (req, res) => {
  res.send("Api running! Better catch it");
}
router.get('/', apiRunning);


// test array of feed urls -------------------------------------
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

// get feeds to the front end from the test array NO DB
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

// MongoDB Routes--------------------------------------------------

// get all feeds
feedTestRoutes.route('/').get( (req, res) => {
  feedTest.find( (err, feeds) => {
    if( err ) {
      console.log( err) 
    } else {
      res.json(feeds)
    }
  })
}) 

// get feed by id
feedTestRoutes.route('/:id').get( (req, res) => {
  let id = req.params.id
  feedTest.findById( id, (err, feed) =>{
    res.json(feed)
  })
})

// add a feed 
feedTestRoutes.route('/add').post( (req, res) => {
  let feed = new feedTest(req.body)
  feed.save()
    .then( () => {
      res.status(200).json({'feed': 'feed added successfully'});
    })
    .catch( () => {
      res.status(400).send('adding new feed failed');
    })
})



app.listen( port, () => {
  console.log(`Server running on port ${port}`);
})

