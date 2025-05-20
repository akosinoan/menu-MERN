import express from "express";
import 'dotenv/config';
import authRoutes from "./routes/authroutes.js";
import {connectDB} from "./lib/db.js";

import User from "./models/User.js";

import {RedisStore} from 'connect-redis';
import { createClient } from 'redis';
import session from "express-session";
import { isAuthenticated } from "./utils.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));




const redisClient = createClient({
    username: 'default',
    password: 'BzEy7V5UXfMKc2a5qoJRFSXEJ421pVT7',
    socket: {
        host: 'redis-12895.crce197.us-east-2-1.ec2.redns.redis-cloud.com',
        port: 12895
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

//await redisClient.set('foo', 'bar');
//const result = await redisClient.get('foo');
//console.log(result)  // >>> bar



app.use(session({
    store:new RedisStore({client: redisClient}),
    secret: process.env.SESSION_KEY,
    resave:false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true: false ,
        httpOnly:true,
        maxAge: 1000*60*60 //1 hour 
    }
}));

app.get("/api/session",isAuthenticated, (req,res)=>{
    res.json({success:true, loggedIn: true, user: req.session.user})
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(500).json({succss:false,message:err});
    }
    res.clearCookie('connect.sid'); // optional, clears cookie
    res.status(200).json({success:true,message:"logout successfully"});
  });
});

 
app.post("/api/login", express.json() ,async (req,res)=>{
    
    const {username,password} = req.body;
    console.log(`Login ${username} ${password}`);

    if(!username || !password ){
        return res.status(400)
            .json({
                message:'username | password cannot be empty',
                success:false,
            });
    }
    try{
    const user = await User.findOne({email:username})
        if (!user){ 
            console.log(user);
            return res.status(400).json({ message: 'not exist', success:false });
        }
        const isCorrectPassword = await user.comparePassword(password);
        console.log(isCorrectPassword)
        if (!isCorrectPassword){
             return res.status(400).json({ message: 'Invalid email or password', success:false });
        }
        req.session.user = {
            username: user.name,
            email: user.email,
            role: user.role
        }
        return res.status(200).json({message:"Login successful",success:true, redirectTo :'/dashboard' });

    }catch(err){
        console.log(err)
        return res.status(500).json({
                message:'Something went wrong... DB error',
                success:false,
            });
    } 

} );

app.get('/api/session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.use("/api/auth", authRoutes);

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);

    connectDB();
})