const express = require('express')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')
const util = require('util')
const read = util.promisify(fs.readFile)
const path = require('path')
require('dotenv').config()
const app = express()

app.use(cors())

const port = process.env.PORT || 3030
app.set('port', port)

app.get('/ping', (req, res) => {
    console.log('a new request to ping')
    return res.send('pong')
})

app.get('/posts', async (req, res) => {
    const types = ['question', 'solution']
    let descriptions = await descriptionsCache()
    let dataUrl = 'https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=node%20js&site=stackoverflow'
    let rawPosts = (await fetch(dataUrl)).items
    let posts = rawPosts.map((post, i) => {
        return {
            title : post.title,
            description : descriptions[i%descriptions.length],
            tags : post.tags,
            user : post.owner.display_name,
            date: post.creation_date,
            type: pick(types)
        }
    })
    posts = shuffle(posts)
    await sleep(rand(0,2500))
    return res.json(posts)
})

app.listen(app.get('port'), () => {
    let port = app.get('port')
    console.log(`The server is running at http://localhost:${port}`)
})


async function fetch(url, options = {}) {
    try{
        let response = await axios.request({ ...options, url })
        return response.data
    }catch(err){
        console.error(err)
        return []
    }
}

async function getDescriptions(){
    const url = 'https://real-time-product-search.p.rapidapi.com/search'
    const options = {
        method: 'GET',
        params: { q: 'Nike shoes', country: 'us', language: 'en' },
        headers: {
            'X-RapidAPI-Key': 'cb8863a1femsh066639228b56339p1cd61djsnb52c525af1f8',
            'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
        }
    };
    let result = await fetch(url, options)
    let descriptions = result.data.map(reg => reg.product_description)
    return descriptions
}

async function descriptionsCache(){
    let location = path.resolve(`${__dirname}/descriptions.json`)
    let content = await read(location, 'utf8')
    content = JSON.parse(content)
    let descriptions = content.data.map(reg => reg.product_description)
    return descriptions   
}

function shuffle(list){
    const { ceil, random } = Math
    let len = list.length
    for(let k = 0; k < len - 1; k++){
        let newPos = ceil(random() * (len - k - 1) + k)
        let buffer = list[k]
        list[k] = list[newPos]
        list[newPos] = buffer
    }
    return list
}

function pick(list) {
    const { random, floor } = Math
    let i = floor(random() * list.length)
    return list[i]
}

function sleep(duration){
    return new Promise(res => {
        setTimeout(() =>{
            res(true)
        }, duration)
    })
}

function rand(a,b){
    const { random, floor } = Math
    if(b === undefined){
        b = a; a = 0;
    }
    let dif = b - a
    return floor(random() * dif) + a
}