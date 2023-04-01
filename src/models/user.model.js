const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    id: {type: Number, required: true, unique: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
}, {
    timestamps: true,
});

module.exports = model('User', userSchema);