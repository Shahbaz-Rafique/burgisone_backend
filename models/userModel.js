const mongoose = require('mongoose');

// Schema for Users

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = User;