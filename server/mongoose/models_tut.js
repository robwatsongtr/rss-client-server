const mongoose = require('mongoose')
const { Schema } = mongoose

// MODELS: 

const tankSchema = Schema( { name: String, size: String } )

// When you call mongoose.model() on a schema, Mongoose compiles a model for you. 
const Tank = mongoose.model('Tank', tankSchema)

// An instance of a model is called a document
const small = new Tank({ name: 'Wiesel AWC', size: 'small'})

// save the document 
small.save( (err) => {
  if(err) console.log(err);
})



mongoose.connect('mongodb://127.0.0.1:27017/mongoose-learning')
  .catch( err => console.log(err) )
const connection = mongoose.connection

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})