import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const getHotels = async (req, res) => {
    let hotels;

    try {
        hotels = await Hotel.find({})
        res.status(200).json(hotels)
    } catch (error) {
        
    }
}

export const createHotel = async (req, res) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(201).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getSingleHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId)
        return res.status(200).json(hotel)
    } catch (error) {
        res.send(500).json(error)
    }
}

export const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.hotelId, { $set: req.body }, { new: true })
        return res.status(200).json(updatedHotel)
    } catch (error) {
        res.send(500).json(error)
    }
}

export const deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.hotelId, { $set: req.body }, { new: true })
        return res.status(200).json("Delete successful")
    } catch (error) {
        res.send(500).json(error)
    }
}
