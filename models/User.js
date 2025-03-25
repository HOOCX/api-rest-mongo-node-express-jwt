import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: {unique: true}, 
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: {unique: true}, 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving to database
userSchema.pre('save', async function(next) {
   const user = this;
   if(!user.isModified('password')) return next()

    // Generate a salt and hash the password before saving to the database
    try {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    next()
    
   } catch (error) {
     console.error(error)
     throw new Error('Fallo el hash de la contraseña')
    
   }
});

// Compare password during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

export const User = model('User', userSchema);