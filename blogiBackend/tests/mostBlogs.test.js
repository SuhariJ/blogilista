
const {test, describe} = require('node:test')
const assert = require('node:assert')
const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('./readyBlogs')


describe('returns object with author with most blogs and blog count', () => {


    test('list with one blog returns it', () => {
        const result = mostBlogs(blogs.listWithOneBlog)
        assert.strictEqual(result.author, 'Edsger W. Dijkstra')
        assert.strictEqual(result.blogs, 1)
    })
})
    