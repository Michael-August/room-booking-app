import { Router } from "express";
import { createRoom, deleteRoom, getRooms, getSingleRoom, updateRoom } from "../controllers/room.js";
import {verifyAdmin} from '../middlewares/verificatoons.js'

const router = Router()

router.route('/')
    .get(getRooms)

router.route('/:hotelId')
    .post(verifyAdmin, createRoom)

router.route('/:roomId')
    .put(verifyAdmin, updateRoom)
    .get(getSingleRoom)

router.route('/:roomId/:hotelId')
    .delete(verifyAdmin, deleteRoom)

export default router