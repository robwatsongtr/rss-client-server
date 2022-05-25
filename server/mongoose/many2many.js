// MongoDB / Mongoose Many-to-Many example 

const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://127.0.0.1:27017/many-to-many')
.catch( err => console.log(err) )
const connection = mongoose.connection

connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})


// define data models:
const TagSchema = new Schema({
  name: String,
  slug: String,
  tutorials: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tutorial"
    }
  ]
})

const TutorialSchema = new Schema({
  title: String,
  author: String,
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ]
})

const Tag = mongoose.model('Tag', TagSchema)
const Tutorial = mongoose.model('Tutorial', TutorialSchema)


// make the docs 
const createTutorial = (tutorial) => {
  return Tutorial.save(tutorial)
    .then( docTutorial => {
      console.log(`\n>> Created Tutorial:\n ${tutorial}` )
      return docTutorial
  })
}

const createTag = (tag) => {
  return Tag.save(tag)
    .then( docTag => {
      console.log(`\n>> Created Tutorial:\n ${docTag}` )
      return docTag
  })
}

// Tag to Tutorial
const addTagToTutorial = (tutorialId, tag) => {
  return Tutorial.findByIdAndUpdate( 
    tutorialId,
    { $push: { tags: tag._id} },
    { new: true, useFindAndModify: false }
  )
}

// Tutorial to Tag 
const addTutorialToTag = (tagId, tutorial) => {
  return Tag.findByIdAndUpdate (
    tagId,
    { $push: { tutorials: tutorial._id } },
    { new: true, useFindAndModify: false }
  )
}

const run = async () => {
  
}