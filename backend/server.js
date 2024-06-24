import express from 'express';
import api from './api/index.js';
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDB } from './libs/utils.js'
import accountRoutes from './routes/index.js';

//configure dotenv
dotenv.config()
console.log(process.env.DB_URI)
//connect to DB
await connectDB();
//set port number
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use('/', accountRoutes);
app.use('/api', api);


app.listen(PORT, ()=> console.log('server running on port 5000'));