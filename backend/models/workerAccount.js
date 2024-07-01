import mongoose from "mongoose";
import crypto from 'crypto';

const workerAccountSchema = new mongoose.Schema(
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
        salt : {
            type: String,
        },
        profile:{
            type: mongoose.Types.ObjectId,
            ref: 'workerProfile'
        },
        role: {
            type: String,
            default: 'worker'
        }
    }
);

workerAccountSchema.pre('save', function(next){
    //genearate salt
    this.salt = crypto.randomBytes(128).toString('hex');
    // only run when new account is created or password is updated
    if (!this.isModified('password')) return next();
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 310000, 32, 'sha256').toString('hex');
    next();
});
workerAccountSchema.set('timestamps', true);
export default mongoose.model('workerAccount', workerAccountSchema);