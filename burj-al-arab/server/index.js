const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())


const user = 'burjAlAdmin'
const pass = 'sa112233'


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${pass}@cluster0.i3zel.mongodb.net/burjAlArab?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
client.connect(err => {
    const bookCollection = client.db("burjAlArab").collection("booking");
    app.post('/addBooking', (req, res) => {
        const newBooking = req.body
        bookCollection.insertOne(newBooking)
        .then(result => {
            console.log(result);
            res.send(result.insertedCount > 0)
        })

    })
    app.get('/bookings', (req, res) => {
        console.log(req.headers.authorization);
        bookCollection.find({ email: req.query.email})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})