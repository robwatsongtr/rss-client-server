const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Outlet = new Schema({
  outlet_name: String,
  outlet_URL: String,
  outlet_links: {
      linkType: String,
      URL: String 
  },
  outlet_contact_name: String,
  outlet_contact_email: String,
  outlet_icon: String, 
  outlet_feeds: { type: mongoose.Schema.Types.ObjectId, ref: 'Feed' },
  outlet_authors: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
})

module.exports = mongoose.model('Outlet', Outlet)