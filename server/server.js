const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')
var cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
// Sử dụng cors middleware trước các route khác
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['POST', 'PUT', 'GET', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser())
const port = process.env.PORT || 8080

// express đọc hiểu data request theo kiểu json
app.use(express.json())

// express đọc hiểu data request theo kiểu urlencoded
app.use(express.urlencoded({extended: true}))
dbConnect()

initRoutes(app)

app.use('/', (req, res) => {
  res.send('SERVER RUNNNN')
})

app.listen(port, () => {
  console.log('Server is listening on port: ' + port)
})