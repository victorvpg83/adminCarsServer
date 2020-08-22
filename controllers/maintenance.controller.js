
const { response } = require('express')
const Maintenance = require('../models/maintenance.model')
const Car = require('../models/car.model')

const createMaintenance = async( req, res = response ) => {

    const { car } = req.body
    const uid = req.uid

    try {

        // Review car
        const carDb = await Car.findById( car )
        console.log(carDb.user, uid)

        if (!carDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay ningún vehículo con ese ID'
            })
        }

        // Review user
        if ( carDb.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            })
        }

        const maintenance = new Maintenance( req.body )

        const maintenanceDb = await maintenance.save()

        await Car.findByIdAndUpdate( car, { $addToSet: { maintenance: maintenanceDb.id } }, { new: true } )

        res.json({
            ok: true,
            maintenanceDb
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }
}

const getCarMaintenance = async( req, res = response ) => {

    const { car } = req.query

    try {
        
        const carMaintenances = await Maintenance.find( { car: car } )
                                                .populate('car', 'brand model')

        // Review car
        const carDb = await Car.findById( car )

        if (!carDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay ningún vehículo con ese ID'
            })
        }

        // Review user
        if ( carDb.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            })
        }

        res.json({
            ok: true,
            maintenances: carMaintenances
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }

}

const updateMaintenance = async( req, res = response ) => {

    const maintenanceId = req.params.id

    try {

        const maintenanceDb = await Maintenance.findById( maintenanceId )

        // Review maintenance
        if ( !maintenanceDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún mantenimiento con ese ID'
            })
        }

        const updatedMaintenance = await Maintenance.findByIdAndUpdate( maintenanceId, req.body, { new: true } )
        
        res.json({
            ok: true,
            updatedMaintenance
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }

}

const deleteMaintenance = async( req, res = response ) => {

    const maintenanceId = req.params.id


    try {

        // const { car } = req.query

        const maintenanceDb = await Maintenance.findById( maintenanceId )

        // Review Maintenance
        if ( !maintenanceDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un mantenimiento con ese ID'
            })
        }

        await Maintenance.findByIdAndDelete( maintenanceId )
        // await Car.findByIdAndUpdate(car, { $pull: { maintenance: maintenanceId } }, { new: true })
        
        res.json({
            ok: true,
            msg: 'Maintenimiento eliminado'
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
    createMaintenance,
    getCarMaintenance,
    updateMaintenance,
    deleteMaintenance
}