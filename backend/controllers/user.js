const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registration(req, res) {
    try {
        let { name, email, password } = req.body;
        if (!name) {
            return res.status(400).json({ status: 0, message: 'Name is required' });
        }
        if (!email) {
            return res.status(400).json({ status: 0, message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ status: 0, message: 'Password is required' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ status: 0, message: 'User already exists' });
        }

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        let data = {
            user: {
                id: user.id
            }
        }
        return res.status(200).json({ status: 1, message: 'Registration Successful', data: data, token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
}

async function login(req, res) {
    try {
        let { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ status: 0, message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ status: 0, message: 'Password is required' });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 0, message: 'User already exists' });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 0, message: 'Invalid Credentials' });
        }
        let token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        let data = {
            user: {
                id: user.id
            }
        }
        return res.status(200).json({ status: 1, message: 'Login Successful', data: data, token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
}

module.exports = {
    registration,
    login
}
