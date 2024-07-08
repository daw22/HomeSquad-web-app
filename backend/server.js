import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
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
//connect to DB
await connectDB();
//set port number
const PORT = process.env.PORT || 5000;

const app = express();
//app.use(cors({origin: 'https://home-squad.vercel.app', credentials: true}));
app.use(cors({origin: 'http://localhost:5000', credentials: true}));
app.use(express.json());
// set static path
// static file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'dist')));

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
        maxAge: 1000 * 60 * 60 * 24, // equals one day
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

app.listen(PORT, ()=> console.log('server running.'));