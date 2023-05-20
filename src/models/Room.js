import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    maxPeople: {
        type: Number,
        requird: true
    },
    roomNumbers: {
        type: [{number: Number, unavailableDates: {type: [Date]}}],
        requird: true
    }
})

export default mongoose.model('Room', RoomSchema)
