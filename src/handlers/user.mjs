import { user } from "../mongoose/schema/user.mjs";
import { validationResult , matchedData} from "express-validator";
import jwt from "jsonwebtoken";


const createUserHandler = async(request,response)=>{
    //console.log('reseveeeeeeeed')
    const errorResult = validationResult(request) ; 
    if(!errorResult.isEmpty()) return response.send(errorResult.array()) ; 
    const data = matchedData(request) ; 
    const newUser = new user(data) ;
    try {
        const savedUser = await newUser.save();
        return response.send(savedUser);
    } catch (error) {
        return response.sendStatus(400);
    }    
}
const getUserHandler = async (request,response)=>{
    try {
        console.log(`user id : ${request.params.id}`);
        const User = await user.findById(request.params.id);
        if (!User) return response.send({msg:'user not found'})
        const token = jwt.sign({User},JWT_SECRET,{expiresIn:'1h'});
        return response.send({token}) ; 
    } catch (error) {

       return response.send({"msg": `${error}`}); ;
    }
    
}
const userLogoutHandler =(request,response)=>{
        console.log('Logout request received'); 
        if(!request.user) {
            console.log('No user logged in')
            return response.sendStatus(401);}
        request.logOut((err)=>{
            if(err) return response.status(400).send(err);
            return response.sendStatus(200); 
        })
    }
const getAllUsersHandler = async(request,response)=>{
    try {
        const users = await user.find();
        const token = jwt.sign({users},JWT_SECRET,{expiresIn:'1h'});
        return response.send({token});
    } catch (error) {
        return response.status(500);
    }
}
/*const getUserHandler = async(request,response)=>{
    try {
        const token = request.headers['authorization'];
        if(!token) return response.sendStatus(401);
        const decodedToken = jwtDecode(token);
        if(!decodedToken) return response.sendStatus(401);
        const users = decodedToken.users;
        return response.send(users);
    } catch (error) {
        return response.status(500);
    }
}*/
const JWT_SECRET= "9ach9ech" ; 
/* tokens do not require server-side storage the server can validate the token without needing to store session data(tokens are statel&ess , each request is treated independently)*/
/* session require server storage to keep track of user data*/ 
/* cookies are stored in client-side to remember information about the client-state   */
const userHandler = {createUserHandler,getUserHandler,userLogoutHandler,getAllUsersHandler}
export default userHandler ; 