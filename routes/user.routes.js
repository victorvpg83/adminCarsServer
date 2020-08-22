const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

/*
    Route '/api/users
*/

router.get( '/',validateJWT , getUsers )

router.post( 
    '/',
    [
       check( 'name', 'El nombre es obligatorio' ).not().isEmpty(), 
       check( 'surname', 'El apellido es obligatorio' ).not().isEmpty(), 
       check( 'email', 'Escribe un email válido' ).isEmail(), 
       check( 'password', 'El password es obligatorio' ).not().isEmpty(),
       validateFields
    ],
    createUser )

router.put( 
    '/:id',
    [
        validateJWT,
        check( 'name', 'El nombre es obligatorio' ).not().isEmpty(), 
        check( 'surname', 'El apellido es obligatorio' ).not().isEmpty(), 
        check( 'email', 'Escribe un email válido' ).isEmail(),
        validateFields
    ], 
    updateUser)

router.delete( '/:id',validateJWT, deleteUser)




module.exports = router