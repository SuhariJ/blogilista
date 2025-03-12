const blogRoutes = require('express').Router()
const Blog = require('../models/blog.js')

blogRoutes.get('/', async (req, res, next) => {

    try {
      const blogs = await Blog.find({})
      res.json(blogs)
    } catch (error) {
      next(error)
    }
})

blogRoutes.post('/', async (req, res, next) => {

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
    })

    try {
      const result = await blog.save()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
})

blogRoutes.delete('/:id', async (req, res, next) => {

  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRoutes.put('/:id', async (req, res, next) => {

  try {
    const changedLikes = {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
    }
    console.log(changedLikes, 'Changed LIkes')

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, changedLikes, {new: true})
    console.log(updatedBlog, 'updated Blog')

    res.json(updatedBlog)
  } catch (error) {
    next(error)
  }

})

module.exports = blogRoutes
