// MongoDB / Mongoose Many-to-Many example 

const mongoose = require('mongoose')
const { Schema } = mongoose

// define data models:
const TagSchema = new Schema({
  name: String,
  slug: String,
  tutorials: [ { type: Schema.Types.ObjectId, ref: "Tutorial" } ]
})

const TutorialSchema = new Schema({
  title: String,
  author: String,
  tags: [ { type: Schema.Types.ObjectId, ref: "Tag" } ]
})

const Tag = mongoose.model('Tag', TagSchema)
const Tutorial = mongoose.model('Tutorial', TutorialSchema)


// ----------------------------------------------------------------------

// make a tutorial document 
const createTutorial = (tutorial) => {
  return Tutorial.create(tutorial)
    .then( docTutorial => {
      console.log( `\n>> Created Tutorial:\n ${tutorial}` )
      return docTutorial
  })
}

// make a tag document 
const createTag = (tag) => {
  return Tag.create(tag)
    .then( docTag => {
      console.log( `\n>> Created Tag:\n ${docTag}` )
      return docTag
  })
}

// make Tag to Tutorial relationship
const addTagToTutorial = (tutorialId, tag) => {
  return Tutorial.findByIdAndUpdate( 
    tutorialId,
    { $push: { tags: tag._id} },
    { new: true, useFindAndModify: false }
  )
}

// make Tutorial to Tag relationshp 
const addTutorialToTag = (tagId, tutorial) => {
  return Tag.findByIdAndUpdate (
    tagId,
    { $push: { tutorials: tutorial._id } },
    { new: true, useFindAndModify: false }
  )
}

const getTutorialWithPopulate = function(id) {
  return Tutorial.findById(id).populate("tags");
};
const getTagWithPopulate = function(id) {
  return Tag.findById(id).populate("tutorials");
};


// ---------------------------------------------------------

const run = async () => {

  // create first tutorial and a couple of tags: 
  const tut1 = await createTutorial({
    title: "How Guitar is Like Programming",
    author: "robwatsondesigns"
  });

  const guitarTipsTag = await createTag({
    name: "guitar tips",
    slug: "guitar-tips"
  });

  const progTipsTag = await createTag({
    name: "programming tips",
    slug: "prog-tips"
  });



  // add the guitar tips tag to the first tutorial
  const tag2tutorial = await addTagToTutorial( tut1._id, guitarTipsTag ) 
  console.log(`\n>> tut1: ${tag2tutorial}\n`)

  // add the first tutorial to the guitar tips tag 
  const tutorial2tag = await addTutorialToTag( guitarTipsTag._id, tut1) 
  console.log(`\n>> guitar tips: ${tutorial2tag}\n`);



  // add the programming tips tag to the first tutorial 
  const anotherTag2Tutorial = await addTagToTutorial( tut1._id, progTipsTag )
  console.log(`\n>> tut1: ${anotherTag2Tutorial}\n`)

  // add the first tutorial to the programming tips tag 
  const anotherTutorial2Tag = await addTutorialToTag( progTipsTag._id, tut1);
  console.log(`\n>> programming tips: ${anotherTutorial2Tag}\n`); 


  // make a second tutorial
  const tut2 = await createTutorial({
    title: "Programming Tips 2022!!!!",
    author: "nostaw bor"
  });

  // add the progTipsTag to the second tutorial
  const tag2tutorial2 = await addTagToTutorial(tut2._id, progTipsTag)
  console.log(`\n>> tut2: ${tag2tutorial2}\n`)

  // add the second tutorial to the progTipsTag
  const tutorial2tag2 = await addTutorialToTag(progTipsTag._id, tut2) 
  console.log(`\n>> programming tips: ${tutorial2tag2}\n `)


  // populate:
  const populateTutorial = await getTutorialWithPopulate(tut1._id);
  console.log("\n>> populated tut1:\n", populateTutorial);

  const populateTag = await getTagWithPopulate(progTipsTag._id);
  console.log("\n>> populated programming tips tag:\n", populateTag);

}


mongoose.connect('mongodb://127.0.0.1:27017/many-to-many')
.catch( err => console.log(err) )
const connection = mongoose.connection

connection.once('open', () => {
console.log("MongoDB database connection established successfully");
  run().then( () => {
    console.log("done")
  })
})