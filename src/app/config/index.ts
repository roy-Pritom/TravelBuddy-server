import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:path.join(process.cwd(),'.env')});

export default{
    port:process.env.PORT,
    salt_rounds:process.env.SALT_ROUNDS,
    access_token_secret:process.env.ACCESS_TOKEN_SECRET,
    access_token_expiresIn:process.env.ACCESS_TOKEN_EXPIRESIN,
    refresh_token_secret:process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expiresIn:process.env.REFRESH_TOKEN_EXPIRESIN
    
}