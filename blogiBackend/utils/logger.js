
const info = (...prompts) => {
    
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...prompts)
    }
}

const error = (...prompts) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.error(...prompts)
    }
}

module.exports = {
    info, error
}