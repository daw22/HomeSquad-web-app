import mongoose from 'mongoose';


const jobOfferSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        budget: {
            type: Number,
            required: true
        },
        picture: {
            type: String,
        },
        worker: {
            type: mongoose.Types.ObjectId,
            ref: 'workerProfile'
        },
        homeowner: {
            type: mongoose.Types.ObjectId,
            ref: 'homeownerProfile'
        },
        status: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'DECLINED'],
            default: 'PENDING',
        },
        deadline: {
            type: Date,
            required: true
        }
    }
);

jobOfferSchema.set('timestamps', true);
export default mongoose.model('jobOffer', jobOfferSchema);