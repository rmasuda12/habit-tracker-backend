import express from "express";
import * as friendsController from "../controller/friendshipController.js";

const router = express.Router()
// getting all the inventories

router.route('/')
    .get(friendsController.getFriends);

export default router;