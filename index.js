const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')
const { response } = require('express')
const bodyParser = require('body-parser')


// Create server
const app = express()

// Cors config
app.use( cors() )

// Read and Body Parse
app.use( express.json() )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Connect to db
dbConnection()


// Routes
app.use( '/api/users', require('./routes/user.routes') )
app.use( '/api/login', require('./routes/auth.routes') )
app.use( '/api/car', require('./routes/car.routes') )
app.use( '/api/maintenance', require('./routes/maintenance.routes') )
app.use( '/api/breakdown', require('./routes/breakdown.routes') )




app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
})