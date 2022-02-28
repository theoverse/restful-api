
const express = require('express')
const app = express()

let hostname = '127.0.0.1'
let port = 3000

app.get('/', (req, res) => {
    console.log(`Server is listening at ${hostname} on port ${port}.`)

    res.send('Welcome banner')
})

app.listen(port, () => {
    console.log(`Server is listening at http://${hostname}:${port}/`)
})