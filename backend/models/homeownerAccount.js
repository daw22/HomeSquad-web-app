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
        },
        role:{
            type: String,
            default: 'homeowner'
        }
    }
);

homeownerAccountSchema.set('timestamps', true);
export default mongoose.model('homeownreAccount', homeownerAccountSchema);