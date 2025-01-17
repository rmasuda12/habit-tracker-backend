import express from "express";
import * as habitsController from "../controller/habitsController.js";

const router = express.Router()
// getting all the inventories

router.route('/')
    .get(habitsController.getHabits)
    .put(habitsController.updateHabitCompletion)

// router.route('/')

export default router;