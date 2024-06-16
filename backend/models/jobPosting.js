import mongoose from 'mongoose';


const jobPostingSchema = new mongoose.Schema(
    {
        employer: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        category: {
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
        stillOpen: {
            type: Boolean,
            defult: true,
        },
        awardedTo: {
            type: mongoose.Types.ObjectId,
            ref: 'workerProfile'
        },
    }
);

jobPostingSchema.set('timestamps', true);
export default mongoose.model('jobPosting', jobPostingSchema);