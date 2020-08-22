const { check } = require('express-validator')
const { Router } = require('express')

const { createCar, getUserCars, getCar, editCar, deleteCar } = require('../controllers/car.controller')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

/*
    /api/car
*/

// Create car

router.post( 
    '/',
    [
        validateJWT,
        check('brand', 'La marca del coche es obligatoria').not().isEmpty(),
        check('model', 'El modelo del coche es obligatorio').not().isEmpty(),
        validateFields
    ],
    createCar )

// Get user cars
router.get( '/', validateJWT, getUserCars )

// Get one car
router.get( '/:id', validateJWT, getCar )

// Edit car
router.put( 
    '/:id',
    [
        validateJWT,
        check('brand', 'La marca del coche es obligatoria').not().isEmpty(),
        check('model', 'El modelo del coche es obligatorio').not().isEmpty(),
        validateFields
    ], 
    editCar )

// Delete car
router.delete( '/:id', validateJWT, deleteCar )


module.exports = router