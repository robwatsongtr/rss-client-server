
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://127.0.0.1:27017/mongoose-learning')
.catch( err => console.log(err) )
const connection = mongoose.connection

connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [ { type: Schema.Types.ObjectId, ref: 'Person'} ]
})

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [ { type: Schema.Types.ObjectId, ref: 'Story'}]
})

const Story = mongoose.model('Story', storySchema)
const Person = mongoose.model('Person', personSchema)

Story.find().populate('author')
  .exec(function (err, story) {
    if (err) return console.log(err);
    console.log(story);
    
  }
);
