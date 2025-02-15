import express from "express";
import router from "./routes/index.mjs";
import mongoose from "mongoose";
import cors from 'cors'
import passport from "passport";
import session from "express-session";
import "./strategies/Local-startegy.mjs"
import MongoStore from "connect-mongo";

//Mongoose connection
mongoose.connect('mongodb://localhost/notes_project')
.then(() => console.log('Connected to MongoDB')) 
.catch(err => console.error('Error connecting to MongoDB:', err));

    
const app=express() ; 
app.use(cors())
app.use(express.json());
app.use(session({
    secret:'9ach9ech',
    saveUninitialized:false ,
    resave:true,
    cookie : {
        maxAge : 1000*60*60*24 
    } , 
    store : MongoStore.create({
            client : mongoose.connection.getClient()
        }
    )
}))
app.use(passport.initialize())
app.use(passport.session())
const PORT = process.env.PORT || 3000;
app.use(router);
app.listen(PORT , ()=>{
    console.log(`running in port ${PORT}`)
})
