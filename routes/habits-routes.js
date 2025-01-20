import express from "express";
import * as habitsController from "../controller/habitsController.js";

const router = express.Router()
// getting all the inventories

router.route('/:id')
    .get(habitsController.getHabits)
    .put(habitsController.updateHabitCompletion)
    .post(habitsController.addHabit)

router.route('/:id/edit')
    .put(habitsController.editHabit)

router.route('/:id/:habit_id')
    .delete(habitsController.deleteHabit)

export default router;