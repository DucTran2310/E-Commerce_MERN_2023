const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

// express đọc hiểu data request theo kiểu json
app.use(express.json())

// express đọc hiểu data request theo kiểu urlencoded
app.use(express.urlencoded({extended: true}))

app.use('/', (req, res) => {
  res.send('SERVER RUNNNN')
})


app.listen(port, () => {
  console.log('Server is listening on port: ' + port)
})