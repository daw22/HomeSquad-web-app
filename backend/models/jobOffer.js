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
            type: number,
            required: true
        },
        pictures: {
            type: [String],
            default: []
        },
        worker: {
            type: mongoose.Types.ObjectId,
            ref: 'workerProfile'
        },
    }
);

jobOfferSchema.set('timestamps', true);
export default mongoose.model('jobOffer', jobOfferSchema);