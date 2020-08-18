const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')


// Create server
const app = express()

// Cors config
app.use( cors() )

// Connect to db
dbConnection()


// Routes

app.get( '/', ( req, res ) =>{
    res.json({
        ok: true,
        msg: 'index route'
    })
})



app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
})