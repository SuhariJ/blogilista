const {test, describe} = require('node:test')
const assert = require('node:assert')
const totalLikes = require('../utils/list_helper').totalLikes
const blogs = require('./readyBlogs')


describe('total likes', () => {
  
    test('when list has only one blog equals the likes of that', () => {
      const result = totalLikes(blogs.listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has many blogs', () => {
        const result = totalLikes(blogs.listWithManyBlogs)
        assert.strictEqual(result, 36)
    })
  })