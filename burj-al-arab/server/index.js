const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser')
const cors = require('cors')
const admin = require('firebase-admin');
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())


var serviceAccount = require("./fir-auth-with-reactjs-firebase-adminsdk-bghm7-0548c43781.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIRE_DB
});


const user = process.env.DB_USER
const pass = process.env.DB_PASS


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
        const bearer = req.headers.authorization
        if(bearer && bearer.startsWith('Bearer ')) {
            const idToken = bearer.split(' ')[1]
            console.log({idToken});
            admin.auth().verifyIdToken(idToken)
                .then(function (decodedToken) {
                    let tokenEmail = decodedToken.email;
                    console.log(tokenEmail);
                    console.log(req.query.email);
                    if(tokenEmail == req.query.email) {
                        bookCollection.find({ email: req.query.email })
                            .toArray((err, documents) => {
                                res.send(documents)
                            })
                    }
                }).catch(function (error) {
                    // Handle error
                });
        }
        else {
            res.status(401).send('un-authorized access')
        }
       

        
    })
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})