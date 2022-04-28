/*
Subdocuments 

Subdocuments are documents embedded in other documents. In Mongoose, this means 
you can nest schemas in other schemas. Mongoose has two distinct notions of 
subdocuments: arrays of subdocuments and single nested subdocuments.
*/

const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://127.0.0.1:27017/mongoose-learning')
.catch( err => console.log(err) )
const connection = mongoose.connection

connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})


//----------------

const childSchema = new Schema( { name: String, type: String })

const parentSchema = Schema({ 
  // array of subdocuments in the parent schema 
  children: [childSchema],
  // single nested subdocument
  child: childSchema
})

// make parent model 
const Parent = mongoose.model('Parent', parentSchema)

// make a parent object
const parent = new Parent({ 
  children: [ { name: 'Matt', type: 'son' }, { name: 'Sarah', type: 'daughter' } ],
  child: { name: 'Billy', type: 'son' }
})

parent.save()

