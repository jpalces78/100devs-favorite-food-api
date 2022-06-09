// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path')
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//help
let db,
    dbConnectionStr = `mongodb+srv://jpman309:TznxAln2EBbRjtHA@cluster0.oks5jky.mongodb.net/?retryWrites=true&w=majority`
    dbName = 'Cluster0'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
})

app.get('/',(request, response)=>{
    db.collection('foods').find().toArray()
        .then(data => {
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

app.post('/addFood', (request, response) => {
    db.collection('foods').insertOne({name: request.body.name,
    food: request.body.food})
        .then(result => {
            console.log('Food and Name Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
