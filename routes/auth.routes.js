const { Router } = require('express')
const { login, renewToken } = require('../controllers/auth.controller')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

/*
    path: api/login
*/

router.post( 
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El passwordes obligatorio').not().isEmpty(),
        validateFields
    ], 
    login )

router.get( '/renew', validateJWT, renewToken )



module.exports = router