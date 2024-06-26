import express from 'express';

const api = express.Router();

api.get('/status', (req, res) => {
    res.status(200).json({"status": "200"});
});

// search workers
// search jobs
export default api;