import jwt from 'jsonwebtoken';
import { user } from '../mongoose/schema/user.mjs';

const SECRET_KEY = '9ach9ech'; 
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.sendStatus(401); // No token present

    jwt.verify(token, SECRET_KEY, async (err, tokenUser) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403)}; // Forbidden 
        try{
            
            const id = tokenUser.User._id;
            const findUser = await user.findById(id);
            console.log(tokenUser,id);
            if(!findUser) throw new Error('user not found');
            req.user = findUser; 
            next();
        }
        catch(err){
            console.log(err);
            res.sendStatus(403);}
    } 

);
};