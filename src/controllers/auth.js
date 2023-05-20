import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createError } from "../utils/error.js"

export const register = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    })

    try {
        await newUser.save()
        res.status(201).json({ success: true, newUser, msg: 'User created' })
    } catch (error) {
        next(createError(500, 'something went wrong'))
    }
}

export const login = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    try {
        const user = await User.findOne({ email: req.body.email })

        if(!user) {
            return next(createError(404, 'user email or password does not exist'))
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if(!isPasswordCorrect) {
            return next(createError(401, 'email or password wrong, check again'))
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, email: user.email }, process.env.JWT_SECRET)

        const { password, isAdmin, ...otherProps } = user._doc

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({...otherProps, access_token: token})

    } catch (error) {
        next(createError(500, 'something went wrong'))
    }
}