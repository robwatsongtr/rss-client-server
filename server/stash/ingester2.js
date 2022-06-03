
const mongoose = require('mongoose')
const Parser = require('rss-parser')
const Feeds = require('../models/Feed')
const Outlet = require('../models/Outlet.js')
const Media = require('../models/Media')
const Creator = require('../models/Creator')
const { collection } = require('../models/Creator')

const parser = new Parser({
  customFields: {
    // includes article icon url field. Also renames field form first 
    // entry in array to second. 
    item: [ 
      ['media:content', 'mediaLink'] 
    ]
  }
})

const processArticlesFromDB = async () => {
  try {
    const articleFeeds = await Feeds.find({ format: 'article' }).populate('Outlet')
    console.log(`ARTICLE FEEDS:\n${articleFeeds}`)

    const articleFeedPromises = articleFeeds.map( 
      fds => { return saveArticles( fds._id, fds.rssURL, fds.Outlet.name ) }
    )
    const savedArticleItems = await Promise.all(articleFeedPromises) 
    console.log(`Parsed and saved ${savedArticleItems.length} article items`);

  } catch(err) {
    console.log(err)
  }   
}

const processPodcastsFromDB = async () => {
  try {
    const podcastFeeds = await Feeds.find({ format: 'podcast' }).populate('Outlet')
    console.log(`PODCAST FEEDS:\n${podcastFeeds}`)

    const podcastFeedPromises = podcastFeeds.map( 
      fds => { return savePodcasts( fds._id, fds.rssURL, fds.Outlet.name ) }
    )
    const savedPodcastItems = await Promise.all(podcastFeedPromises) 
    console.log(`Parsed and saved ${savedPodcastItems.length} podcast items`);

  } catch(err) {
    console.log(err)
  }
}

const processVideosFromDB = async () => {
  try {
    const videoFeeds = await Feeds.find({ format: 'video' }).populate('Outlet')
    console.log(`VIDEO FEEDS:\n${videoFeeds}`)

    const videoFeedPromises = videoFeeds.map( 
      fds => { return saveVideos( fds._id, fds.rssURL, fds.Outlet.name ) }
    )
    const savedVideoItems = await Promise.all(videoFeedPromises) 
    console.log(`Parsed and saved ${savedVideoItems.length} video items`);

  } catch(err) {
    console.log(err)
  }
}




const saveArticles = async (id, url, OutletName) => {
  try {
    
    const articleFeedItems = await parser.parseURL(url)
    return Promise.all( articleFeedItems.items.map( item => {

      try {
        let article = new Media()
        
        article.Feed = id // passed in
        article.creators = item.creator 
        article.Outlet = OutletName // passed in 
        article.title = item.title
        article.description = item.content
        article.Creators = []
        article.url = item.link
        article.imageURL = item.mediaLink?.['$']?.url 
        article.guid = item.guid
        article.publicationDate = item.pubDate
        article.downloadedDate = new Date() // not working 
        article.format = 'article'
        article.active = false

        return article.save()

      } catch (err) {
        console.log(`article feed item ${item.title} error ${err}`)
      }

    }))

  } catch(parseErr) {
    console.log(`parsing ${url}: ${parseErr}`)
  }

}

const savePodcasts = async (id, url, OutletName) => {
  try {
    
    const podcastFeedItems = await parser.parseURL(url)
    return Promise.all( podcastFeedItems.items.map( item => {

      try {
        let podcast = new Media()
        
        podcast.Feed = id // passed in
        podcast.creators = item.creator 
        podcast.Outlet = OutletName // passed in 
        podcast.title = item.title
        podcast.description = item.content
        podcast.Creators = []
        podcast.url = item.link
        podcast.imageURL = item.itunes.image
        podcast.guid = item.guid
        podcast.publicationDate = item.pubDate
        podcast.downloadedDate = new Date() // not working 
        podcast.format = 'podcast'
        podcast.active = false

        return podcast.save()

      } catch (err) {
        console.log(`podcast feed item ${item.title} error ${err}`)
      }

    }))

  } catch(parseErr) {
    console.log(`parsing ${url}: ${parseErr}`)
  }
  
}

const saveVideos = async (id, url, OutletName) => {
  try {
    
    const videoFeedItems = await parser.parseURL(url)
    return Promise.all( videoFeedItems.items.map( item => {

      try {
        let video = new Media()
        
        video.Feed = id // passed in
        video.creators = item.author
        video.Outlet = OutletName // passed in 
        video.title = item.title
        video.description = ''
        video.Creators = []
        video.url = item.link
        video.imageURL = ''
        video.guid = ''
        video.publicationDate = item.pubDate
        video.downloadedDate = new Date() // not working 
        video.format = 'video'
        video.active = false

        return video.save()

      } catch (err) {
        console.log(`video feed item ${item.title} error ${err}`)
      }

    }))

  } catch(parseErr) {
    console.log(`parsing ${url}: ${parseErr}`)
  }
  
}

mongoose.connect('mongodb://127.0.0.1:27017/optout-backend')
  .catch( err => console.log(err) )
const connection = mongoose.connection

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");

  processArticlesFromDB().then( () => {
    console.log("finished processing articles") 
  })
  processPodcastsFromDB().then( () => {
    console.log("finished processing podcasts") 
  })
  processVideosFromDB().then( () => {
    console.log("finished processing videos") 
  })
  
})

