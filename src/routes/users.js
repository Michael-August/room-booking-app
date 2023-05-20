import { Router } from "express";
import { getUsers, getSingleUser, updateUser, deleteUser } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../middlewares/verificatoons.js";

const router = Router()

router.route('/')
    .get(verifyAdmin, getUsers)

router.route('/:userId')
    .put(verifyUser, updateUser)
    .get(verifyUser, getSingleUser)
    .delete(verifyUser, deleteUser)

export default router
