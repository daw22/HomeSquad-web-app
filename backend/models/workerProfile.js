import mongoose from 'mongoose';


const job = mongoose.Schema(
    {
        price: {
            type: Number,
        },
        jobPosting: {
            type: mongoose.Types.ObjectId,
            ref: 'jobPosting',
        },
        jobOffer: {
            type: mongoose.Types.ObjectId,
            ref: 'jobOffer'
        },
        hireDate: {
            type: Date,
            required: true
        },
        completedDate: {
            type: Date,
        }
    }
)
const workerProfileSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        },
        profilePic: {
            type: String,
            defuault: "",
        },
        bio: {
            type: String,
            default: "",
        },
        rating: {
            type: String,
            default: "0.0"
        },
       numberOfJobs: {
            type: Number,
            default: 0
       },
       jobsHistory: {
            type: [job],
            default: []
       },
       address: {
            type: mongoose.Types.ObjectId,
            ref: 'address' 
       },
       jobCategory: {
            type: String,
            required: true,
       },
       jobDescription: {
            type: String,
            default: ""
       } 
    }
);

workerProfileSchema.set('timestamps', true);
export default mongoose.model('workerProfile', workerProfileSchema);