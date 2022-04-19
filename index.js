const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8888

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const startApp = async () => {

  try {
    app.listen(PORT, () => console.log(`App started on PORT:${PORT}.`))
  } catch (e) {
    console.log(e.message)
  }

}

startApp()
