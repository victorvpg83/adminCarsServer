const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')
const { response } = require('express')


// Create server
const app = express()

// Cors config
app.use( cors() )

// Read and Body Parse
app.use( express.json() )

// Connect to db
dbConnection()


// Routes
app.use( '/api/users', require('./routes/user.routes') )
app.use( '/api/login', require('./routes/auth.routes') )




app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
})