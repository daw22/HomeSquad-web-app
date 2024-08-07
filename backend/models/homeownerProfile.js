import mongoose from "mongoose";

const hire = mongoose.Schema({
  price: {
    type: Number,
  },
  worker: {
    type: mongoose.Types.ObjectId,
    ref: "workerProfile",
    required: true,
  },
  jobPosting: {
    type: mongoose.Types.ObjectId,
    ref: "jobPosting",
  },
  jobOffer: {
    type: mongoose.Types.ObjectId,
    ref: "jobOffer",
  },
  hireDate: {
    type: Date,
    required: true,
  },
  completedDate: {
    type: Date,
  },
});
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

const homeownerProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
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
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address!']
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
    default: "0.0",
  },
  moneySpent: {
    type: String,
    default: "0.0",
  },
  numberOfHires: {
    type: Number,
    default: 0,
  },
  hireHistory: {
    type: [hire],
    default: [],
  },
  address: {
    type: address,
  },
  favoriteWorkers: {
    type: [mongoose.Types.ObjectId],
    ref: "workerProfile",
    default: [],
  },
  jobPostings: {
    type: [mongoose.Types.ObjectId],
    ref: "jobPosting",
    default: [],
  },
  jobOffers: {
    type: [mongoose.Types.ObjectId],
    ref: "jobOffer",
    default: [],
  },
});

homeownerProfileSchema.set("timestamps", true);
export default mongoose.model("homeownerProfile", homeownerProfileSchema);
