const express = require('express')
const bodyParser = require('body-parser')
const port = 4000
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID

const pass = process.env.DB_PASS
const user = process.env.DB_USER

const uri = `mongodb+srv://${user}:${pass}@cluster0.ktphm.mongodb.net/NodeCrud?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

client.connect(err => {
    const userCollection = client.db("NodeCrud").collection("userData");
    
    app.post('/addUser', (req, res) => {
        const user = req.body
        userCollection.insertOne(user)
        .then(result => {
            console.log('data added');
            res.redirect('/')
        })
    })
    app.get('/users', (req, res) => {
        userCollection.find({})
        .toArray((err, doc) => {
            res.send(doc)
        })
    })
    app.get('/user/:id', (req, res) => {
        userCollection.find({ _id: ObjectId(req.params.id) })
            .toArray( (err, doc) => {
                res.send(doc[0])
            } )
    })
    app.patch('/update/:id', (req, res) => {
        userCollection.updateOne({ _id : ObjectId(req.params.id)}, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                dept: req.body.dept
            }
        })
        .then(result => {
            console.log(result);
        })
    })
    app.delete('/delete/:id', (req, res) => {
        userCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                console.log(result);
            })
    })
});

app.listen(port, () => {
    console.log(` listening to the port ${port}`)
})