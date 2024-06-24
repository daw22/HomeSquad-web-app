import express from "express";
import homeownerAccount from "../models/homeownerAccount.js";
import workerAccount from "../models/workerAccount.js";
import homeownerProfile from "../models/homeownerProfile.js";
import workerProfile from "../models/workerProfile.js";
import crypto from 'crypto';

const accountRoutes = express.Router();

// signup route for workers
accountRoutes.post("/signup/worker", async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    jobCategory,
    jobDescription,
  } = req.body;

//   console.log(userName, firstName, lastName, password, email, category, workDescription);
//   res.status(201).send("success");
try {
  const profile = new workerProfile({firstName, lastName, email, jobCategory, jobDescription});
  const savedProfile = await profile.save();
  const account = new workerAccount({userName, password, "profile": savedProfile._id});
  await account.save();
  res.status(201).json(savedProfile);
}catch(e){
  console.log(e)
  res.status(500);
}
});

// signup route for homeowners
accountRoutes.post("/signup/homeowner", async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
  } = req.body;

try{
  const profile = new homeownerProfile({firstName, lastName, email});
  const savedProfile = await profile.save();
  const account = new homeownerAccount({userName, password, "profile": savedProfile._id});
  await account.save();
  res.status(201).json(savedProfile);  
}catch(e){
  res.status(500).json();
}
});

// login route for workers
export default accountRoutes;