// Import necessary modules and models
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { hashPassword } = require('../utils/bcryptUtils');

// Registration route
router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        let check = await User.findOne({ email: req.body.email });
        
        if (check) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await hashPassword(req.body.password);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            profile_image: req.body.profile_image,
            password: hashedPassword,
        });

        await user.save();

        const data = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(data, process.env.JWT_SECRET);

        res.status(201).json({
            success: true,
            token,
            message: "User registered successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// List users route
router.get('/list', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update user route
router.put('/update/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser,
            message: "User updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Delete user route
router.delete('/delete/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
