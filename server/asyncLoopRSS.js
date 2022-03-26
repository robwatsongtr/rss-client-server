
// Utilizing Async Await in a loop to return a bunch of stuff 

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

// await with map loop -
// We create an array of promises in the map that then get 
// resolved with promise.all 

const feedsLoop = async () => {

  // create array of promises.
  // I want to put into a try catch block but not sure how.
  const feedPromises = feedURls.map( async (fds) => {
    const returnedFeeds = await parser.parseURL(fds);
    return returnedFeeds;
  })

  // now we wait for the array of promises to get resolved
  const allFeeds = await Promise.all(feedPromises);
  console.log( allFeeds ) 

}

feedsLoop()


