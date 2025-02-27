import { Strategy } from "passport-local";
import passport from "passport";
import { user } from "../mongoose/schema/user.mjs";


passport.serializeUser((user, done) => {
  console.log(`iniside seialize user ${user.id}`);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`inside deserialize user ${id}`);
  try {
    const findUser = await user.findById(id);
    if (!findUser) throw new Error("user not found");
    done(null, findUser);
  } catch (error) {
    done(err, null);
  }
});
export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log(`username ${username} / password : ${password}`);
    try {
      const finduser = await user.findOne({ username });
      if (!finduser) throw new Error("user not found");
      if (password !== finduser.password) throw new Error("password incorrect");
      done(null, finduser);
    } catch (error) {
      done(error, null);
    }
  })
);
