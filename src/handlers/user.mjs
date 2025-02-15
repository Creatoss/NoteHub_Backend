import { user } from "../mongoose/schema/user.mjs";
import { validationResult , matchedData} from "express-validator";


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
        const User = await user.findById(request.params.id);
        if (!User) return response.send({msg:'user not found'})
        return response.send(User) ; 
    } catch (error) {
       return response.status(500)
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

/* tokens do not require server-side storage the server can validate the token without needing to store session data(tokens are statel&ess , each request is treated independently)*/
/* session require server storage to keep track of user data*/ 
/* cookies are stored in client-side to remember information about the client-state   */
const userHandler = {createUserHandler,getUserHandler,userLogoutHandler}
export default userHandler ; 