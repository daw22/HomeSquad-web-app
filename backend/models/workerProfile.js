import mongoose from 'mongoose';

const address = new mongoose.Schema(
    {
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true
        },
        streetName: {
            type: String,
        },
        location :{
            type: { type: String, default: 'Point' }, //geoSpatial point
            coordinates: [Number] //[longitude, latitude] in this order
        },
        houseNumber: {
            type: String
        }
    }
);
address.index({ 'location': '2dsphere' });

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
            default: "",
        },
        aboutYourSelf: {
            type: String,
            default: "",
        },
        rating: {
            type: String,
            default: "0.0"
        },
       numberOfJobsCompleted: {
            type: Number,
            default: 0
       },
       jobOffers: {
            type: [mongoose.Types.ObjectId],
            ref: 'jobOffer',
            default: []
       },
       address: {
            type: address
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