const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this is my test schema
const rss_feeds_db = new Schema({
  feedName: { 
    type: String 
  },
  feedURL: { 
    type: String 
  }
})

module.exports = mongoose.model('rss_feeds_db', rss_feeds_db)