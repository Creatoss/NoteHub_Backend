import { request, response, Router } from "express";
import userHandler from "../handlers/user.mjs";
import { createUserValdator } from "../utils/validatorSchema.mjs";
import { checkSchema } from "express-validator";
import passport from "passport";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/user.mjs";

const jwtSecret = "9ach9ech";

const userRouter = Router();

userRouter.get("/api/users/:id", userHandler.getUserHandler);
userRouter.post(
  "/api/users/signIn",
  checkSchema(createUserValdator),
  userHandler.createUserHandler
);
/*userRouter.post("/api/users/auth",passport.authenticate("local"),(request,response)=>{
  return response.send({msg:"authentificating..."})
}
);*/

userRouter.post("/api/users/auth", (req, res, next) => {
  passport.authenticate("local", (err, User, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: `${err}` });
    }
    if (!User) {
      // If user is not found or password is incorrect
      return res
        .status(401)
        .json({ message: info.message || "Authentication failed" });
    }

    // If authentication is successful, generate a token
    const token = jwt.sign({ User }, jwtSecret, {
      expiresIn: "1h",
    });

    // Send the user and token back in the response
    res.json({
      message: "Authentication successful",
      token: token, // The generated token
    });
  })(req, res, next);
});
userRouter.post("/api/users/logout", userHandler.userLogoutHandler);
userRouter.get("/api/users",authenticateToken,userHandler.getAllUsersHandler); 

export default userRouter;
