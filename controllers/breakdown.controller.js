const { response } = require('express')
const Breakdown = require('../models/breakdown.model')
const Car = require('../models/car.model')

const createBreakdown = async (req, res = response) => {
    console.log (req.body)

    const { car } = req.body
    const uid = req.uid

    try {
        
        // review car
        const carDb = await Car.findById( car )

        if( !carDb ) {
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

        const breakdown = new Breakdown( req.body )

        const breakdownDb = await breakdown.save()

        await Car.findByIdAndUpdate(car, { $addToSet: { breakdown: breakdownDb.id } }, { new: true } )

        res.json({
            ok: true,
            breakdownDb
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hubo un error inesperado'
        })
    }

}

const getCarBreakdown = async (req, res = response) => {

    const { car } = req.query

    try {
        
        const carBreakdowns = await Breakdown.find({ car: car })
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
            breakdowns: carBreakdowns
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hubo un error inesperado'
        })
    }

}

const updateBreakdown = async ( req, res = response ) => {

    const breakdownId =req.params.id

    try {
        const breakdownDb = await Breakdown.findById( breakdownId )

        if( !breakdownDb ) {
            res.status(404).json({
                ok: false,
                msg: "No hay ninguna avería con ese ID"
            })
        }

        const updatedBreakdown = await Breakdown.findByIdAndUpdate( breakdownId, req.body, { new: true } )

        res.json({
            ok: true,
            updatedBreakdown
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hubo un error inesperado'
        })
    }

}

const deleteBreakdown = async ( req, res = response ) => {

    const breakdownId = req.params.id

    try {
        
        const BreakdownDb = await Breakdown.findById( breakdownId )

        if( !BreakdownDb ) {
            res.status(404).json({
                ok: false,
                msg: 'No hay ninguna avería con ese ID'
            })
        }

        await Breakdown.findByIdAndDelete( breakdownId )

        res.json({
            ok: true,
            msg: 'Avería eliminada'
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
    createBreakdown,
    getCarBreakdown,
    updateBreakdown,
    deleteBreakdown

}