const { Router } = require('express')
const { createMaintenance, getCarMaintenance, updateMaintenance, deleteMaintenance } = require('../controllers/maintenance.controller')

const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

/*
    /api/maintenance
*/

router.post( '/', validateJWT, createMaintenance )

// Get car maintenances
router.get( '/', validateJWT, getCarMaintenance )

router.post( '/:id', validateJWT, updateMaintenance )

router.delete( '/:id', validateJWT, deleteMaintenance )




module.exports = router