const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleErrors = err => {
    let errors = { email: "", password: "" };

    console.log(err);
    if (err.message === "Incorrect Email") {
        errors.email = "That email is not registered";
    }

    if (err.message === "Incorrect Password") {
        errors.password = "That password is incorrect";
    }

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}
exports.register = async (req, res) => {
    try {
        const { fullName, role, phoneNumber, email, password } = req.body;
        const newUser = await User.create({
            fullName,
            role,
            phoneNumber,
            email,
            password
        });
        const token = jwt.sign({user: newUser._id}, process.env.TOKEN || "SUPER-SECRET-TOKEN");
        
        res.status(201).json({ user: newUser._id, created: true, token });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

exports.login = async (req, res) => {
    // Implement login functionality here
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = jwt.sign({user: user._id}, process.env.TOKEN || "SUPER-SECRET-TOKEN");
        
        res.status(200).json({ user: user._id, created: true, token });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
    // const user = req.body;
    // console.log(user);
    // res.status(201).json({ message: 'Logged in!'});
};
