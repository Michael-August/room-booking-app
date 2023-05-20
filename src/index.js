import express, { json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import hotelRoute from './routes/hotels.js'
import roomRoute from './routes/rooms.js'

import errorHandler from './middlewares/errorHandlers.js'
import { verifyAdmin, verifyToken } from './middlewares/verificatoons.js'

const app = express()
dotenv.config()

// Middlewars
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/hotel', hotelRoute)
app.use('/api/v1/room', roomRoute)

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log('Connected to mongoDB');
        app.listen('8000', () => {
        console.log('server listening on port 8000')
})
    } catch (error) {
        throw error;
    }
}

start()
