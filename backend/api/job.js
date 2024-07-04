import express from 'express';
import jobPosting from '../models/jobPosting.js';
import jobOffer from '../models/jobOffer.js';

const jobRoutes = express.Router();

jobRoutes.post('/postjob', async (req, res)=>{
    const { jobCategory, jobTitle, jobDescription, budjet, picture } = req.body; 
    let data = {category: jobCategory, title: jobTitle, description: jobDescription, budget: budjet};
    data['employer'] = req.user._id;
    if (picture) data['picture'] = picture;
    const jobPost = new jobPosting(data);
    const resp = await jobPost.save();
    res.status(201).json(resp);
})

jobRoutes.post('/offerjob', async (req, res)=>{
    const { title, description, budget, picture, worker} = req.body;
    const data = {title, description, budget, worker};
    if (picture) data['picture'] = picture;
    const offer = new jobOffer(data);
    try{
        const resp = await offer.save();
        res.status(201).json(resp);
    }catch(e){
        res.status(400);
    }
})
export default jobRoutes;