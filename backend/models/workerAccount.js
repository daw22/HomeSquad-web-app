import mongoose from "mongoose";
import { generateSalt } from "../../libs/utils";

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
        slat : {
            type: String,
            default: generateSalt()
        },
        profile:{
            type: mongoose.Types.ObjectId,
            ref: 'workerProfile'
        },
        role:{
            type: String,
            default: 'worker'
        }
    }
);

workerAccountSchema.set('timestamps', true);
export default mongoose.model('workerAccount', workerAccountSchema);