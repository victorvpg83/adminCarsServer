const { response } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const { genJwt } = require('../helpers/jwt')

const login = async( req, res = response ) => {

    const { email, password } = req.body

    try {

        const dbUser = await User.findOne({ email })

        if (! dbUser) {
            res.status(404).json({
                ok: false,
                msg: 'No hay un usuario con ese email'
            })
        }

        // Verify password

        const validPassword = bcrypt.compareSync( password, dbUser.password )

        if ( !validPassword ) {
            res.status(404).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        // Generate token
        const token = await genJwt( dbUser.id )
        
        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }


}

const renewToken = async( req, res = response ) => {

    const uid = req.uid

    // Generate JWT
    const token = await genJwt( uid )

    // Get user
    const user = await User.findById( uid )

    res.json({
        ok: true,
        token,
        user
    })

}



module.exports = {
    login,
    renewToken
}
