const { Schema, model } = require('mongoose')

const MaintenanceSchema = new Schema({
    oil: {
        type:{
            type: String
        },
        brand: {
            type: String
        },
        oilFilter: {
            type: Boolean,
        },
    },
    airFilter: {
        type: Boolean,
    },
    timingBelt: {
        type: Boolean,
    },
    sparkPlugs: {
        type: Boolean,
    },
    batery: {
        type: Boolean,
    },
    auxBelts: {
        type: Boolean,
    },
    tyres: {
        type: Boolean,
    },
    fuelFilter: {
        type: Boolean,
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car'
    },
    date: {
        type: Date,
    },
    km: {
        type: Number,
    },
    other: {
        type: String,
    },
})

MaintenanceSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model( 'Maintenance', MaintenanceSchema )