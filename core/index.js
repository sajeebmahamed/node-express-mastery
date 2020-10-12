const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 5000
const app = express()

app.use(cors())
app.use(bodyParser.json())


const letters = ['a', 'b', 'c', 'd', 'e']
app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/letters', (req, res) => {
    res.send(letters)
})
app.get('/letters/:id', (req, res) => {
    const id = req.params.id
    const letter = letters[id]
    res.send({ id, letter })
})
app.post('/add/letter', (req, res) => {
    //save to db
    const user = req.body
    user.id = 1
    res.send(user)
    console.log('data received');
})

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
})