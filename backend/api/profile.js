import express from 'express';
import workerProfile from '../models/workerProfile.js';
import homeownerProfile from '../models/homeownerProfile.js'

const profileRouter = express.Router();

profileRouter.post('/edit-address', async (req, res)=>{
    const { country, city, streetName, location, houseNumber } = req.body;
    const collection = req.user.role === 'worker' ? workerProfile : homeownerProfile;
    const profile = await collection.findById(req.user.profile);
    if (!profile.address){ 
        const newAddress = {
            country,
            city,
            streetName,
            houseNumber,
            location: {coordinates: []}
        };
        newAddress.location.coordinates = location;
        profile.address = newAddress;
        const newProfile = await profile.save();
        res.status(201).json(newProfile); 
    }
    
    else {
        profile.address.country = country;
        profile.address.city = city;
        profile.address.streetName = streetName;
        profile.address.houseNumber = houseNumber;
        profile.address.location.coordinates = location;
        const newProfile = await profile.save();
        res.status(201).json(newProfile);
    }
})

profileRouter.post('/edit-aboutme', async (req, res)=>{
    const { aboutme } = req.body;
    const collection = req.user.role === 'worker' ? workerProfile : homeownerProfile;
    const profile = await collection.findById(req.user.profile);
    profile.aboutYourSelf = aboutme;
    let newProfile = await profile.save();
    newProfile = await newProfile.populate('address');
    res.status(201).json(newProfile);
})

profileRouter.post('/edit-job', async (req, res)=>{
    const {Category, Detail} = req.body;
    const collection = req.user.role === 'worker' ? workerProfile : homeownerProfile;
    const profile = await collection.findById(req.user.profile);
    profile.jobCategory = Category;
    profile.jobDescription = Detail;
    let newProfile = await profile.save();
    newProfile = await newProfile.populate('address');
    res.status(201).json(newProfile);
})

export default profileRouter;