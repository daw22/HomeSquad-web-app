import mongoose from "mongoose";
import { generateSalt } from '../libs/utils.js';

const homeownerAccountSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        slat : {
            type: String,
            default: generateSalt()
        },
        profile:{
            type: mongoose.Types.ObjectId,
            ref: 'homeownerProfile'
        }
    }
);

homeownerAccountSchema.pre('save', function(next){
    if (!this.isModified('password')) return next();
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 310000, 32, 'sha256').toString('hex');
    next();
})
homeownerAccountSchema.set('timestamps', true);
export default mongoose.model('homeownreAccount', homeownerAccountSchema);