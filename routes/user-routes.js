import express from "express";
import * as usersController from "../controller/usersController.js";

const router = express.Router()
// getting all the inventories

router.route('/')
    .get(usersController.getUsers);

router.route('/:id')
    .get(usersController.getUser);

export default router;