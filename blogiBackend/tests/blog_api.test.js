const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const blogs = require('./readyBlogs')
const Blog = require('../models/blog')

const api = supertest(app)

const manyBlogs = blogs.listWithManyBlogs

describe('Normal GET:s works', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(manyBlogs)
    })
    
    test('Right amount of JSON blogs', async () => {
    
        const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    
        assert.strictEqual(response.body.length, manyBlogs.length)
    })

    test('id is in right format', async () => {
        const firstBlog = (await api.get('/api/blogs')).body[0]
        const keys = Object.keys(firstBlog)
        
        assert.strictEqual(keys.includes('id'), true)
    })
})

describe('POST works', () => {

    test('HTTP POST works fine', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmfullll',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        }
        
        await api.post('/api/blogs').send(newBlog).expect(201)
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)
        
        assert.strictEqual(manyBlogs.length + 1, response.body.length)
        assert(contents.includes('Go To Statement Considered Harmfullll'))
    })
    
    test('Likes equal 0 if not given', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmfullll',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }
    
        await api.post('/api/blogs').send(newBlog).expect(201)
        const response = await api.get('/api/blogs')
        const objects = response.body
        assert(objects.some(b => b.title === 'Go To Statement Considered Harmfullll' && b.likes === 0))
    })
    
    test('return 400 if no title or url', async () => {
    
        const noTitle = {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        }
    
        const noUrl = {
            title: 'Go To Statement Considered Harmfullll',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    
        await api.post('/api/blogs').send(noTitle).expect(400)
        await api.post('/api/blogs').send(noUrl).expect(400)
       
    })

})

describe('DELETE works', () => {
    test('Deleting first blog', async () => {
        const id = manyBlogs[0]._id
        await api.delete(`/api/blogs/${id}`).expect(204)
    })
})


// I didnt got this to work:((
describe('PUT works', () => {

    test('Changing first blogs likes works', async () => {
        const id = manyBlogs[0]._id
        console.log(id)
        const changedLikes = {
            title: manyBlogs[0].title,
            author: manyBlogs[0].author,
            url: manyBlogs[0].url,
            likes: 1,
        }

        const response = await api.put(`/api/blogs/${id}`).send(changedLikes)
        console.log(response.body)

    })

})



after(async () => {
    await mongoose.connection.close()
})