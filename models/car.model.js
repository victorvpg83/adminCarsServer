const { Schema, model } = require('mongoose')

const CarSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    fuel: {
        type: String,
    },
    plate: {
        type: String,
    },
    img: {
        type: String,
    },
    maintenance: [{
        type: Schema.Types.ObjectId,
        ref: 'Maintenance'
    }],
    breakdown: [{
        type: Schema.Types.ObjectId,
        ref: 'Breakdown'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    year: {
        type: String,
    },
    motor: {
        type: String,
    },
})

CarSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model( 'Car', CarSchema )