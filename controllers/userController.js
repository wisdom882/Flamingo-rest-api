import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../util/generateToken.js";

//Sign up a user
//Route : POST /api/users

const signUpUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //check if user exist - if not create
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Could not create user");
  }
});

//Login (Authentication) User
//Route: POST /api/users/login

const loginUser = asyncHandler(async (req, res) => {
  //destructure data from our request body
  const { email, password } = req.body;

  //Find user in the DB
  const user = await User.findOne({ email: email });

  //match password
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//Get list of all users
//ROUTE GET /api/users

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); //No need for parameter
  res.json(users);
});

//Get user by id
//ROUTE GET /api/users/:id

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Update a user
//ROUTE PUT /api/users/:id

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Delete a user
//ROUTE DELETE /api/users/:id

const deleteUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not deleted");
  }
});

//Export all functions
export { signUpUser, loginUser, getUsers, getUserById, updateUser, deleteUser };
