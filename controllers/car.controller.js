const { response } = require('express')

const Car = require('../models/car.model')
const User = require('../models/user.model')

const createCar = async( req, res = response ) => {

    console.log(req.uid)

    const uid = req.uid
    const car = new Car({
        user: uid,
        ...req.body
    })

    // save car
    try {

        const carDb = await car.save()

        await User.findByIdAndUpdate( uid, { $addToSet: { car: carDb.id } }, { new: true } )
        
        res.json({
            ok: true,
            car: carDb
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema inesperado'
        })
    }

}

const getUserCars = async( req, res = response ) => {

    try {
        const userCars = await Car.find({user: req.uid})
                                .populate('user', 'name')
    
        res.json({
            ok: true,
            userCars
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los coches'
        })
    }

}

const getCar = async( req, res = response ) => {

    const carId = req.params.id

    try {

        const carDb = await Car.findById( carId )
                                .populate( "maintenance" )
        
        // review user
        if ( carDb.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            })
        }

        res.json({
            ok: true,
            carDb
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }


}

const editCar = async( req, res = response ) => {

    const carId = req.params.id

    try {
        const carDb = await Car.findById( carId )
    
        // car exist
        if (!carDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún coche con ese ID'
            })
        }
    
        // review user
        if ( carDb.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            })
        }
    
        const updatedCar = await Car.findByIdAndUpdate( carId, req.body, { new: true } )
    
        res.json({
            ok: true,
            car: updatedCar
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }

}

const deleteCar = async( req, res = response ) => {

    const carId = req.params.id

    try {

        const carDb = await Car.findById( carId )

        // car exist
        if (!carDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún coche con ese ID'
            })
        }
    
        // review user
        if ( carDb.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            })
        }

        await Car.findByIdAndDelete( carId )
        await User.findByIdAndUpdate(req.uid, { $pull: { car: carId } }, { new: true })

        res.json({
            ok: true,
            msg: 'Vehículo eliminado'
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
    createCar,
    getUserCars,
    getCar,
    editCar,
    deleteCar
}