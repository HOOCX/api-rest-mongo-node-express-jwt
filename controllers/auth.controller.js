import { User } from "../models/User.js";
import jwt from "jsonwebtoken"

export const register = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({ success: true, user });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
            
        }
        return res.status(500).json({ message: 'Server error' });
    }
}
export const login = async (req, res) => {
    // Login logic here
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        
        // Generate JWT token
        const token = jwt.sign(
            { uid: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ success: true, token });

        return res.json({success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
        
    }
    //res.send('Login successful');
    
}
