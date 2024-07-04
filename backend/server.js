import express from 'express';
import api from './api/index.js';
import cors from 'cors'
import dotenv from 'dotenv';
import session from 'express-session';
import MongoDBStore from 'connect-mongo';
import passport from 'passport';
import { connectDB } from './libs/utils.js'
import accountRoutes from './routes/index.js';
import searchRoutes from './routes/searchRoutes.js';

//configure dotenv
dotenv.config()
console.log(process.env.DB_URI)
//connect to DB
await connectDB();
//set port number
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());

//setup session middleware
const store = MongoDBStore.create({
    mongoUrl: process.env.DB_URI,
  });

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    store,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 // equals one day
    }
});
app.use(sessionMiddleware);

//passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', accountRoutes);
app.use('/api', api);
app.use('/search', searchRoutes);

app.listen(PORT, ()=> console.log('server running on port 5000'));