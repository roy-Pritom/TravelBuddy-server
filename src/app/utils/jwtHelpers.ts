import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

type TJwtPayload={
    id:string,
    email:string,
    role:string
}
const createToken=(jwtPayload:TJwtPayload,secret:Secret,expiresIn:string)=>{
    // console.log(jwtPayload);
const token=jwt.sign(jwtPayload,secret,{
    algorithm:'HS256',
    expiresIn
});
return token;
}

const verifyToken=(token:string,secret:Secret)=>{
    return jwt.verify(token,secret) as JwtPayload;
}


export const jwtHelpers={
    createToken,
    verifyToken

}