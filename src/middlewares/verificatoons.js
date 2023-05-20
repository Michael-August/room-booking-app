import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if(!token) {
        return next(createError(401, "not authenticated"))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(createError(400, 'JWT is malformed'))
        }

        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id == req.params.userId || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "Unauthorized, you can not perform this action"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin) {
            
            next()
        } else {
            console.log('I Ran')
            return next(createError(403, "Unauthorized, you can not perform this action"))
        }
    })
}

