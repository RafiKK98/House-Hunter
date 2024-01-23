const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['House Owner', 'House Renter'],
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.statics.login = async function (email, password) {
    const user = this.findOne({ email });
    if (user) {
        return user;
    }
    throw Error("Incorrect Email or Password");
}

const User = mongoose.model('User', userSchema);

module.exports = User;
