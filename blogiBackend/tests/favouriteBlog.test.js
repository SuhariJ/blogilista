const {test, describe} = require('node:test')
const assert = require('node:assert')
const favouriteBlog = require('../utils/list_helper').favouriteBlog
const blogs = require('./readyBlogs')


describe('blog with most likes', () => {
    test('Array with one blog returns it', () => {
        const result = favouriteBlog(blogs.listWithOneBlog)
        assert.strictEqual(result, blogs.listWithOneBlog[0])
    })
    test('Array with many blogs returns the blog with most likes', () => {
        const result = favouriteBlog(blogs.listWithManyBlogs)
        assert.strictEqual(result, blogs.listWithManyBlogs[2])
    })
})
