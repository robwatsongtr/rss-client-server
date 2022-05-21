
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://127.0.0.1:27017/many-to-many')
.catch( err => console.log(err) )
const connection = mongoose.connection

connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})