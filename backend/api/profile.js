import express from 'express';
import address from '../models/address.js';
import workerProfile from '../models/workerProfile.js';
import homeownerProfile from '../models/homeownerProfile.js'

const profileRouter = express.Router();

profileRouter.post('/edit-address', async (req, res)=>{
    const { country, city, streetName, location, houseNumber } = req.body;
    const collection = req.user.role === 'worker' ? workerProfile : homeownerProfile;
    const profile = await collection.findById(req.user.profile).populate('address');
    if (!profile.address){ 
        const newAddress = new address({
            country,
            city,
            streetName,
            houseNumber,
        });
        newAddress.location.coordinates = location;
        const savedAddress = await newAddress.save();
        profile.address = savedAddress._id;
        let newProfile = await profile.save();
        newProfile = await newProfile.populate('address');
        res.status(201).json(newProfile); 
    }
    
    else {
        const document = await address.findById(profile.address);
        document.country = country;
        document.city = city;
        document.streetName = streetName;
        document.houseNumber = houseNumber;
        document.location.coordinates = location;
        const updatedDocument = await document.save();
        const newProfile = await profile.populate('address');
        res.status(201).json(newProfile);
    }
})

profileRouter.post('/edit-aboutme', async (req, res)=>{
    const { aboutme } = req.body;
    const collection = req.user.role === 'worker' ? workerProfile : homeownerProfile;
    const profile = await collection.findById(req.user.profile).populate('address');
    profile.aboutYourSelf = aboutme;
    let newProfile = await profile.save();
    newProfile = await newProfile.populate('address');
    res.status(201).json(newProfile);
})

export default profileRouter;