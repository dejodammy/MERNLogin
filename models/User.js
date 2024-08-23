const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: [true, "Please enter First Name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter last name"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter email"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    phone: {
        type: String
    }
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;
