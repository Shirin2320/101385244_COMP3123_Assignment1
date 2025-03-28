const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Signup
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully.", user_id: newUser._id });
    } catch (err) {
        res.status(500).json({ message: "Error creating user.", error: err.message });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
        res.status(200).json({ message: "Login successful.", jwt_token: token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in.", error: err.message });
    }
};
