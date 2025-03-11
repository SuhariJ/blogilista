const lodash = require('lodash')
const blogDB = require('../tests/readyBlogs')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((acc, blog) => acc + blog.likes, 0)
    return total
}

const favouriteBlog = (blogs) => {
    if(blogs.length===0) return 0

    let mostLikes = blogs[0]
    blogs.forEach(blog => {
      if(blog.likes > mostLikes.likes){
        mostLikes = blog
      }
    })
    return mostLikes
}

const mostBlogs = (blogs) => {
    if(blogs.length===0) return 0
    
    const mappedBlogs = lodash.map(blogs, 'author')
    const authorCount = lodash.countBy(mappedBlogs)
    const arr = Object.entries(authorCount)
    
    let most = arr[0]

    arr.forEach(v =>{
        if(v[1] > most[1]){
            most = v
        }
    })
    const authorAndBlogs = {
        author: most[0],
        blogs: most[1],
    }
    
    return authorAndBlogs
}

const mostLikes = (blogs) => {
    if(blogs.length===0) return 0

    const groupped = lodash.groupBy(blogs, 'author')
    const arr = Object.entries(groupped)
    const bet = arr.map(v => {
        return [v[0], totalLikes(v[1])]
    })

    let most = bet[0]

    bet.forEach(v =>{
        if(v[1] > most[1]){
            most = v
        }
    })

    const authorAndLikes = {
        author: most[0],
        likes: most[1],
    }

    return authorAndLikes
}

  
module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}

