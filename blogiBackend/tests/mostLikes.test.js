const {test, describe} = require('node:test')
const assert = require('node:assert')
const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./readyBlogs')

describe('Returns object with author and their total likes ', ()=>{

    test('with one blog in list', () => {
        const result = mostLikes(blogs.listWithOneBlog)
        assert.strictEqual(result.author, 'Edsger W. Dijkstra')
        assert.strictEqual(result.likes, 5)
    })

    test('with many blogs in list', () => {
        const result = mostLikes(blogs.listWithManyBlogs)
        assert.strictEqual(result.author, 'Edsger W. Dijkstra')
        assert.strictEqual(result.likes, 17)
    })
})