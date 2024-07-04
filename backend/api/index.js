import express from 'express';
import profileRouter from './profile.js';
import jobRoutes from './job.js';
const api = express.Router();

const isAuthenticated = (req, res, next)=>{
    if(!req.isAuthenticated()) res.send("not authorized");
    else next();
}

api.get('/status', (req, res) => {
    res.status(200).json({"status": "200"});
});
api.use(isAuthenticated);
api.use('/profile', profileRouter);
api.use('/job', jobRoutes);


// search workers
// search jobs

// 
export default api;