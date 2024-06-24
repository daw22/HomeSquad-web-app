import crypto from 'crypto';
import mongoose from 'mongoose';

export function generateSalt(){
    return crypto.randomBytes(128).toString('hex');
}

export async function connectDB() {
    await mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('DB connected!');
}
