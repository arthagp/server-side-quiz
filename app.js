const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8000
const cors = require('cors')
const router = require('./router/index')
const morgan = require('morgan')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));
app.use(router);

app.listen(PORT, () => {
    console.log(`server running listening on http://localhost/${PORT}`)
})