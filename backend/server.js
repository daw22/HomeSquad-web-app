import express from 'express';
import api from './api/index.js';
import cors from 'cors'

const app = express();
app.use(cors({origin: 'https://homesquad-5zr4.onrender.com/'}));
app.use(express.json());

//routes
app.use('/api', api);


app.listen(5000, ()=> console.log('server running on port 5000'));