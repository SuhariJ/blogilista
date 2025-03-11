const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(); // Convert _id to string and rename it to 'id'
        delete returnedObject._id; // Remove the original _id field
        delete returnedObject.__v; // Remove the version key (__v)
    }
})

module.exports = mongoose.model('Blog', blogSchema)