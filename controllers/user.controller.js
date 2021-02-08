const User = require('../models/user.model')
const { response } = require('express')
const bcrypt = require('bcrypt')
const { genJwt } = require('../helpers/jwt')

const getUsers = async( req, res = response ) => {

    try {

        const users = await User.find({}, 'email name surname car role')
                                .populate('car', 'brand model')
        
        res.json({
            ok: true,
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha habido un error al buscar usuarios'
        })
    }

}

const createUser = async( req, res = response ) => {

    const { email, password } = req.body

    try {
        
        // Exist email?
        const existEmail = await User.findOne({ email })
        
        if (existEmail) {
            res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }
        
        const user = new User( req.body )
        // console.log(user)

        // Crypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )

        // Save user
        await user.save()

        // create JWT
        const token = await genJwt( user.id )


        res.json({
            ok: true,
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el usuario'
        })
    }

}

const updateUser = async( req, res = response ) => {

    const uid = req.params.id

    try {
        
        const dbUser = await User.findById( uid )

        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        // Update user

        const { password, email, ...fields } = req.body

        if ( dbUser.email !== email ) {
            const existEmail = await User.findOne({ email })

            if ( existEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
            fields.email = email
        }
        
        const updatedUser = await User.findByIdAndUpdate( uid, fields, { new: true } )

        res.json({
            ok: true,
            user: updatedUser
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }

} 

const deleteUser = async( req, res = response) => {

    const uid = req.params.id

    try {

        const dbUser = await User.findById( uid, 'name surname')

        if ( !dbUser ) {
            res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese ID'
            })
        }

        // Delete user

        await User.findByIdAndDelete( uid )

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }

}




module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
