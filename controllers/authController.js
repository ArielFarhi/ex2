require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { idNumber, fullName, address, role, username, password, yearOfStudy } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User with this username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            idNumber,
            fullName,
            address,
            role,
            username,
            password: hashedPassword,
            yearOfStudy: role === "Student" ? yearOfStudy : undefined,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role,
                fullName: newUser.fullName
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'defaultSecret',
            { expiresIn: '10m' } 
        );

        res.header('Authorization', `Bearer ${token}`);
        return res.status(200).json({ 
            message: "Login successful", 
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                fullName: user.fullName
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

module.exports = { 
    register,
    login,
}


