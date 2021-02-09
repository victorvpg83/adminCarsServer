const { Router } = require('express')
const { createBreakdown, deleteBreakdown, updateBreakdown, getCarBreakdown } = require('../controllers/breakdown.controller')

const { validateJWT } = require('../middlewares/validate-jwt')

const router = new Router()

/*
    api/breakdown
*/

// create breakdown
router.post( '/', validateJWT, createBreakdown )

// get car breakdowns
router.get( '/', validateJWT, getCarBreakdown )

// delete car breakdown
router.delete( '/:id', validateJWT, deleteBreakdown )

// update car breakdown
router.put( '/:id' , validateJWT, updateBreakdown)


module.exports = router