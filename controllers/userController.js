import asyncHandler from "express-async-handler"
import User from '../models/userModel'
import generateToken from "../utils/generateToken"

//Signup user
const signUpUser = asynchandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    //check if user exist ( yes -/no we create)
    const userExists = await User.findOne({email: email})

    if (userExists) {
        res.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user.id)
        })

    } else{
        res.status(400)
        throw new Error("Could not create user");
    }
})

//signIn
//route Post/api/users/login

const LogInUser = asyncHandler(async(res,req) => {

    const{email, password} = req.body

    const user = await User.findOne({email: eamil})

    if(user && (await user.matchPassword(password))){

        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error ("email or password do not match")
    }
})