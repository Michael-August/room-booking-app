import { Router } from "express";
import { createHotel, deleteHotel, getHotels, getSingleHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../middlewares/verificatoons.js";

const router = Router()

router.route('/')
    .get(getHotels)
    .post(verifyAdmin, createHotel)

router.route('/:hotelId')
    .put(verifyAdmin, updateHotel)
    .get(getSingleHotel)
    .delete(verifyAdmin, deleteHotel)

export default router
