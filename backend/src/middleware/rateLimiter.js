import {ratelimit} from '../config/upstash.js';

const rateLimiter= async (req, res, next) => {
    try{
        const{success}= await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({message:"Too many requests, please try again later."});
        }
    
    next();
    }
    catch(err){
        console.error("Error in rateLimiter middleware:", err);
        return res.status(500).json({message:"Internal Server Error"});
        next(err);
    }

}

export default rateLimiter;