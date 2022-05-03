// Populate Virtuals 

const mongoose = require('mongoose')
const { Schema } = mongoose


// Example of a "one to many" relationship, you want to store the Author within
// the blog post, not the other way around, in case you have one author that has 
// a ton of blog posts. 

const AuthorSchema = new Schema({
  name: String
})

const BlogPostSchema = new Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
      content: String
    }
  ]
})

// The two above schemas out as such don't support populating an author's list of 
// blog posts. That's where virtual populate comes in. Virtual populate means 
// calling populate() on a virtual property that has a ref option as shown below.
// Specifying a virtual with a `ref` property is how you enable virtual population
AuthorSchema.virtual('posts', {
  ref: 'BlogPost',
  localField: '_id',
  foreignField: 'author'
})

const Author = mongoose.model('Author', AuthorSchema, 'Author')
const BlogPost = mongoose.model('BlogPost', BlogPostSchema, 'BlogPost')


// const blogAuthor = new Author( { name: 'Rob Watson'} )
const blogAuthor2 = new Author( { name: 'Billy Bob Butty Jones'})

const blogPost3 = new BlogPost({
  title: "You might wanna check yourself.",
  author: blogAuthor2._id,
  comments: [
    {
      author: blogAuthor2._id,
      content: "blah blah aaaaareskfjnsodijf blah blah blha yeah great blah"
    }
  ]
})

const blogPost4 = new BlogPost({
  title: "Love is not the answer",
  author: blogAuthor2._id,
  comments: [
    {
      author: blogAuthor2._id,
      content: "Bullshit"
    }
  ]
})

blogAuthor2.save( (err) => {
  if(err) return console.log(err)
})

blogPost3.save()

blogPost4.save()

const main = async () => {
  const theAuthor = await Author.findOne().populate('posts')
  console.log(theAuthor.posts[1].title)
}

mongoose.connect('mongodb://127.0.0.1:27017/mongoose-learning')
.catch( err => console.log(err) )
const connection = mongoose.connection

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  main()
})
