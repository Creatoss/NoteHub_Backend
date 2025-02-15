import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type : mongoose.Schema.Types.String , required: true },
    email: { type : mongoose.Schema.Types.String , required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    profilePicture: { type: mongoose.Schema.Types.String , required: false ,default : ''},
    phone: { type: mongoose.Schema.Types.Number, required: false },
    adress: { type: mongoose.Schema.Types.String, required: false },
    //role: { type: mongoose.Schema.Types.String, required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
})

export const user = mongoose.model("user",userSchema) ; 