import {RedisStore} from 'connect-redis';
import session from "express-session";
import { createClient } from 'redis';


const redisSession = async ()=> { 

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
    
    return session({
        store:new RedisStore({client: redisClient}),
        secret: process.env.SESSION_KEY,
        resave:false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production' ? true: false ,
            httpOnly:true,
            maxAge: 1000*60*60 //1 hour 
        }
    })
}



export {redisSession} 