import express from 'express';
import workerProfile from '../models/workerProfile.js';
import jobPosting from '../models/jobPosting.js'

const searchRoutes = express.Router();

searchRoutes.post('/handiman', async (req, res)=>{
    const {firstName, lastName, radius, category} = req.body;
    let query = {};
    if (firstName) query['firstName'] = firstName;
    if (lastName) query['lastName'] = lastName;
    if (category) query['jobCategory'] = category;
    if (radius && radius.location.length == 2){
        query['address.location'] = {
            $near: {
                $geometry: 
                    {
                        type: 'point',
                        coordinates: [radius.location[0], radius.location[1]]
                    },
                    $maxDistance: radius.radius * 1000
                
                // [
                //     [radius.location[0], radius.location[1]],
                //     radius.radius / 6378.1
                //   ]
            }
        }
    }
    console.log('query:', query);
    const handimen = await workerProfile.find(query, ['-address']);
    console.log(handimen);
    res.status(200).json(handimen);
})

searchRoutes.post('/jobs', async (req, res)=>{
    const { category, budjet, radius } = req.body;
    let query = {};
    if (category) query['jobCategory'] = category;
    if (budjet) query(['budjet']) = budjet;
    const jobs = await jobPosting.find(query).exec();
    res.status(200).json(jobs);
})
export default searchRoutes;