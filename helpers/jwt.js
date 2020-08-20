const jwt = require('jsonwebtoken')

const genJwt = ( uid ) => {
    return new Promise( ( resolve, reject ) =>{
        const payload = { uid }

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err)
                reject( 'Hubo un error al crear el token' )
            } else {
                resolve( token )
            }
        })
    })
}

module.exports = {
    genJwt
}

