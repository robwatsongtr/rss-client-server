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

