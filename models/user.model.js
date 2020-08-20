const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    img: {
        type: String,
    },
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'Cars'
    }],
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
})

UserSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.uid = _id 
    return object
})

module.exports = model( 'User', UserSchema )