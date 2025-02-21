import { request, response, Router } from "express";
import userHandler from "../handlers/user.mjs";
import { createUserValdator } from "../utils/validatorSchema.mjs";
import { checkSchema } from "express-validator";
import passport from "passport";

const userRouter = Router();

userRouter.get("/api/users/:id", userHandler.getUserHandler);
userRouter.post(
  "/api/users/signIn",
  checkSchema(createUserValdator),
  userHandler.createUserHandler
);
userRouter.post("/api/users/auth",passport.authenticate("local"),(request,response)=>{
  return response.send({msg:"authentificating..."})
}
);
userRouter.post("/api/users/logout", userHandler.userLogoutHandler);

export default userRouter;
