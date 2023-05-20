import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const getUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        
    }
}

export const getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        return res.status(200).json(user)
    } catch (error) {
        next(createError(500, 'something went wrong'))
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true })
        return res.status(200).json(updatedUser)
    } catch (error) {
        next(createError(500, 'something went wrong'))
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId, { $set: req.body }, { new: true })
        return res.status(200).json("Delete successful")
    } catch (error) {
        next(createError(500, 'something went wrong'))
    }
}
