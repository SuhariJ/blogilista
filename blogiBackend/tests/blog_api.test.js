const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const blogs = require('./readyBlogs')
const Blog = require('../models/blog')

const api = supertest(app)

const manyBlogs = blogs.listWithManyBlogs

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(manyBlogs)
})

test('Right amount of JSON blogs', async () => {

    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, manyBlogs.length)
})


after(async () => {
    await mongoose.connection.close()
})