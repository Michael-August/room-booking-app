import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"


export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()

        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (error) {
            next(error)
        }

        res.status(201).json(savedRoom)
    } catch (error) {
        
    }
}

export const getRooms = async (req, res) => {
    let rooms;

    try {
        rooms = await Room.find({})
        res.status(200).json(rooms)
    } catch (error) {
        
    }
}
export const getSingleRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId)
        return res.status(200).json(room)
    } catch (error) {
        res.send(500).json(error)
    }
}

export const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId, { $set: req.body }, { new: true })
        return res.status(200).json(updatedRoom)
    } catch (error) {
        res.send(500).json(error)
    }
}

export const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelId

    try {
        await Room.findByIdAndDelete(req.params.roomId, { $set: req.body }, { new: true })
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.roomId } })
        } catch (error) {
            next(error)
        }
        return res.status(200).json("Delete successful")
    } catch (error) {
        res.send(500).json(error)
    }
}