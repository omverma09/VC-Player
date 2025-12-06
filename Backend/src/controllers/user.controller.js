import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";

//Code for user register.
const register = async(req, res) => {
    const {name, username, password} = req.body;

    try{
        const userExist = await User.findOne({username});
        if(userExist){
            return res.status(httpStatus.FOUND).json({message: "User is already Exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        })
        await newUser.save();

        res.status(httpStatus.CREATED).json({message: "User created sucessfully"});

    } catch(error){
        res.json({message: `something went wrong ${error}`});
    }

}

//Code for login user.

const login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({message: "Please Provide."});
    }

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message: "User Not Found"})
        }
        let isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token: token, message: "Login sucessfully"});
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({message: "INVALID"});
        }
        
    } catch(error){
        res.json({message: `something went wrong ${error}`});
    }
}

const getUserHistory = async(req, res) => {
    const {token} = req.query;

    try {
        const user = await User.findOne({token: token});
        const meetings = await Meeting.find({user_id: user.username});
        res.json(meetings);
    } catch (error) {
        res.json({message: `something went wrong${error}`});
    }
}

const addToHistory = async(req, res) => {
    const {token, meeting_code} = req.body;
    try {
        const user = await User.findOne({token: token});

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code,
        });

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({Message: "Added code to history"});
    } catch (error) {
        res.json({message: `Something went wrong ${error}`})
    }
}

export { register, login, getUserHistory, addToHistory };