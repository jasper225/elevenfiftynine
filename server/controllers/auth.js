const User = require('../models/User');
const generateTokens = require('../utils/generateTokens');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = new User({ name, email, password });

    const { accessToken, refreshToken } = generateTokens(newUser._id);
    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ user: { _id: newUser._id, name: newUser.name, email: newUser.email }, accessToken });
  }
    catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
  
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid email or password' });
        
        
        const { accessToken, refreshToken } = generateTokens(user._id);
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.json({ user: { _id: user._id, name: user.name, email: user.email }, accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: 'Token is required' });
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id).select('+refreshToken');
        if (!user || user.refreshToken !== token) return res.status(401).json({ message: 'Invalid token' });

        const { accessToken, refreshToken } = generateTokens(user._id);
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (token) {
            const user = await User.findOne({ refreshToken: token }).select('+refreshToken');
            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }
        res.clearCookie('refreshToken');
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

