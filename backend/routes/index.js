import express from "express";
import homeownerAccount from "../models/homeownerAccount.js";
import workerAccount from "../models/workerAccount.js";
import homeownerProfile from "../models/homeownerProfile.js";
import workerProfile from "../models/workerProfile.js";
import passport from "../libs/passport-config.js"; 

const accountRoutes = express.Router();

// signup route for workers
accountRoutes.post("/signup/worker", async (req, res) => {
  const {
    username,
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
  const account = new workerAccount({username, password, "profile": savedProfile._id});
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
    username,
    firstName,
    lastName,
    email,
    password,
  } = req.body;

try{
  const profile = new homeownerProfile({firstName, lastName, email});
  const savedProfile = await profile.save();
  const account = new homeownerAccount({username, password, "profile": savedProfile._id});
  await account.save();
  res.status(201).json(savedProfile);
}catch(e){
  res.status(500);
  console.log(e);
}
});

// login route for workers
accountRoutes.post('/login/worker', passport.authenticate("worker-local"), async (req, res)=>{
  const { profile } = req.user;
  workerProfile.findOne({_id: profile})
  .populate('address')
  .then((user)=>{
    if (!user)
      res.status(401).json({message: 'auth failed'});
    res.status(200).json(user);
  })
})

// login route for homeowners
accountRoutes.post('/login/homeowner', passport.authenticate("homeowner-local"), (req, res)=>{
  const { profile } = req.user;
  homeownerProfile.findOne({_id: profile})
  .populate('address')
  .then((user)=>{
    if (!user)
      res.status(401).json({message: 'auth failed'});
    res.status(201).json(user);
  });
});

accountRoutes.get('/logout', (req, res)=>{
  if (!req.user) res.status(400);
  req.logout((err) => {
    if (err) console.log(err);
    res.status(200).json({ logedOut: true });
  });
})
export default accountRoutes;