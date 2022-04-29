/*
Populate:

Population is the process of automatically replacing the specified paths in the 
document with document(s) from other collection(s). 

We may populate a single document, multiple documents, a plain object, 
multiple plain objects, or all objects returned from a query. 
*/
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://127.0.0.1:27017/mongoose-learning')
.catch( err => console.log(err) )
const connection = mongoose.connection

connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

// ---- Basic populate Example --------------   

// The ref option is what tells Mongoose which model to use during population.
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [ { type: Schema.Types.ObjectId, ref: 'Story'}]
})

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [ { type: Schema.Types.ObjectId, ref: 'Person'} ]
})

// Our Person model has its stories field set to an array of ObjectIds. 
// The ref option is what tells Mongoose which model to use during population, 
// in our case the Story model. 
// All _ids we store here must be document _ids from the Story model.
const Story = mongoose.model('Story', storySchema)
const Person = mongoose.model('Person', personSchema)


const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
})


// Saving refs to other documents works the same way you normally save properties, 
// just assign the _id value:
author.save( (err) => {
  if (err) return console.log(err);

  const story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return console.log(err);
    // that's it!
  })
})



