import mongoose from 'mongoose';
import workerProfile from './models/workerProfile.js';
import address from './models/address.js';
import { connectDB } from './libs/utils.js';
import dotenv from 'dotenv';
dotenv.config();

const addressData = {
    country: "Ethiopia",
    city: "Adiss Abeba",
    location: {
        coordinates: [38.744364,9.010252]
    },
    streetName: "piasa"
}
const workerProfileData = {
    firstName: "jhon",
    lastName: "doe",
    email: "jhondoe@gamil.com",
    jobCategory: "satellite dish",
    jobDescription: "satellite dish installation and maintainance.",
    address: '666eb3cbe3df4e34a2e6b6fb',
    aboutYourSelf: "I am a fast and efficent worker with good behaviour."
}

async function addWorkerProfile(data) {
    const wp = new workerProfile(data);
    await wp.save();
    console.log("worker profile saved.")
}

async function addAddress(data) {
    const addressModel = new address(data);
    await addressModel.save();
    console.log("address added.")
}

(async () => {
    await connectDB();
    await addWorkerProfile(workerProfileData);
    //await addAddress(addressData);
    mongoose.connection.close();
  })();