import mongoose from 'mongoose';

const bidSchema = mongoose.Schema(
    {
        jobPosting: {
            type: mongoose.Types.ObjectId,
            ref: 'jobPosting',
            required: true
        },
        worker: {
            type: mongoose.Types.ObjectId,
            ref: 'workerProfile',
            required: true
        },
        bidPrice: {
            type: Number,
            required: true
        },
        pending: {
            type: Boolean,
            default: true
        },
        message: {
            type: String,
            default: ""
        },
        accepted: {
            type: Boolean,
            default: false
        }
    }
);

bidSchema.set('timestamps', true);
export default mongoose.model('bid', bidSchema);