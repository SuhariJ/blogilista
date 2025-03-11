const mongoose = require('mongoose')
const config = require('./utils/config')

const url = config.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connecting to server...')
mongoose.connect(url)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch(() => {
    console.log('oot huono koodaamaan')
  })

const blogSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Post = mongoose.model("blog", blogSchema)

const post = new Post({
    content: "jahuujahuu",
    important: false,
})

post.save()
  .then(() => {
    console.log('note saved successfully')
  })
  .catch(error => {
    console.log('There was error in saving your blog:', error)
  })

Post.find({})
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
    mongoose.connection.close()
  })
