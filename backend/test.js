import mongoose from 'mongoose';
import workerProfile from './models/workerProfile.js';
import { connectDB } from './libs/utils.js';
import dotenv from 'dotenv';
dotenv.config();

const workerProfileData = {
    firstName: "jhon",
    lastName: "doe",
    email: "jhondoe@gamil.com",
    jobCategory: "satellite dish",
    jobDescription: "satellite dis installation and maintainance."
}

async function addWorkerProfile(data) {
    const wp = new workerProfile(data);
    await wp.save();
    console.log("worker profile saved.")
}

(async () => {
    await connectDB();
    await addWorkerProfile(workerProfileData);
    mongoose.connection.close();
  })();