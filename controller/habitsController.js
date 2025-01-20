import initKnex from "knex";
import config from "../knexfile.js";

const knex = initKnex(config);

const getHabits = async(req, res) => {
    try {
        const data = await knex("habits")
            .leftJoin('habitCompletion', 'habits.id', 'habitCompletion.habit_id')
            .select(
                'habits.user_id',
                'habits.id', 
                'habits.habit_name',
                //aggregate the completed dates into an array and group based on habit.id
                knex.raw('JSON_ARRAYAGG(habitCompletion.completion_date) as completion_dates')
            )
            .groupBy('habits.id')
            .where({
                'habits.user_id': req.params.id
            })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send(`Error retrieving Habits: ${error}`);
    }
};

const updateHabitCompletion = async(req, res) => {
    const updatedHabits = req.body;
    console.log(updatedHabits);

    try {
        for (const habit of updatedHabits) {
            const {id: id, completion_dates: updatedDates, user_id: userId } = habit
            console.log('habit.completion',habit.completion_dates);
            console.log('updatedDates', updatedDates);

            const existingData = await knex("habitCompletion")
                .where({habit_id: id})
                .pluck('completion_date');
            console.log('this is the existing data',existingData)


            //convert existingData to string for comparison
            const existingDataStringified = existingData.map(date =>
                new Date(date).toISOString().split('T')[0])
            console.log(existingDataStringified);

            //dates to be inserted
            const dataToInsert = updatedDates.filter(
                date => !existingDataStringified.includes(date) && date!==null
            );
            console.log('data to insert',dataToInsert);
        
            //dates to be deleted
            const dataToDelete = existingDataStringified
                .filter(date => !updatedDates.includes(date))
                .map((date) => {
                    const dataNorm = new Date(date);
                    dataNorm.setUTCHours(7,0,0,0)
                    dataNorm.toISOString()
                    return dataNorm;
                });

            console.log('data to delete',dataToDelete);

            //insert new data
            if (dataToInsert.length > 0) {
                const newData = dataToInsert.map(date => (
                    {
                        // id: ,
                        habit_id: id,
                        completion_date: date
                    }
                )
            )
            console.log('new data to be inserted',newData);
            await knex('habitCompletion').insert(newData);

            };

            // await knex('habitCompletion').insert(new)
            //delete old data
            if (dataToDelete.length > 0) {
                await knex('habitCompletion')
                  .where({ habit_id: id })
                  .whereIn('completion_date', dataToDelete)
                  .del();
            };
        }
        res.send("habit updater reached")
    } catch (error) {
        res.send(error);
    }
}

const addHabit = async(req, res) => {
    const newHabit = req.body;
    try {
        const newHabitData = {
            habit_name: newHabit.habit_name,
            user_id: req.params.id
        }
        await knex('habits')
            .insert(newHabitData)

        res.send('New habit successfully created')
    } catch (error) {
        res.send(error);
    }   
}

const editHabit = async(req, res) => {
    const newHabit = req.body
    try {
        const update = await knex('habits')
            .where({id: newHabit.id})
            .update({habit_name: newHabit.habit_name}, ['id', 'habit_name']);
        res.send('testing');
    } catch (error) {
        res.send(error)
    }
}

const deleteHabit = async(req, res) => {
    const habitId = req.params.habit_id
    try {
        const deleted = await knex('habits')
            .where({id: habitId})
            .del();
        if (deleted) {
            res.send(`Habit with id:${habitId} has been successfully deleted`)
        } else {
            res.send('Habit could not be found')
        }
    } catch (error) {   
        res.send(error);
    }
}

export {
    getHabits,
    updateHabitCompletion,
    addHabit,
    editHabit,
    deleteHabit
}