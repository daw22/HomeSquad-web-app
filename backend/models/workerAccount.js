import mongoose from "mongoose";
//import { generateSalt } from "../libs/utils.js";
import crypto from 'crypto';

function generateSalt(){
    return crypto.randomBytes(128).toString('hex');
}
const workerAccountSchema = new mongoose.Schema(
    {
        userName: {
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
            required: true
        },
        profile:{
            type: mongoose.Types.ObjectId,
            ref: 'workerProfile'
        }
    }
);

workerAccountSchema.pre('save', function(next){
    this.salt = generateSalt();
    // only run when new account is created or password is updated
    if (!this.isModified('password')) return next();
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 310000, 32, 'sha256').toString('hex');
    next();
});
workerAccountSchema.set('timestamps', true);
export default mongoose.model('workerAccount', workerAccountSchema);