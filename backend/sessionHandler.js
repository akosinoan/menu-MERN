
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
 
 const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

const redisSession = (redisClient)=> {
    
    return({
        store:new RedisStore({client: redisClient}),
        secret: process.env.SESSION_KEY,
        resave:false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production' ? true: false ,
            httpOnly:true,
            maxAge: 1000*60*60 //1 hour 
        }}
    )
}
export {redisClient,redisSession};