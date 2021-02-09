const { Schema, model } = require('mongoose')

const BreakdownSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pieceNumber: {
        type: String
    },
    note: {
        type: String
    },
    date: {
        type: Date
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car'
    },
})

BreakdownSchema.method('toJSON', function (){
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model('Breakdown', BreakdownSchema)
