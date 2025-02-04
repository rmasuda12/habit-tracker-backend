import initKnex from "knex";
import config from "../knexfile.js";
const knex = initKnex(config);

//update this endpoint
const getFriends = async(req, res) => {
    const date = '2025-01-22';
    try {
        const data = await knex.raw(`
            SELECT 
                friendship.user_id,
                u1.name AS user_name,
                u1.profile_picture AS user_profile,
                friendship.friend_id,
                u2.name AS friend_name,
                u2.profile_picture AS friend_profile,
                friendship.status,
                s1.completion_percentage AS user_completion,
                s2.completion_percentage AS friend_completion
            FROM friendship
            JOIN users AS u1 ON friendship.user_id = u1.id
            JOIN users AS u2 ON friendship.friend_id = u2.id
            JOIN habitStats AS s1 ON friendship.user_id = s1.user_id AND s1.date = ?
            JOIN habitStats AS s2 ON friendship.friend_id = s2.user_id AND s2.date = ?
            WHERE friendship.user_id = ?
               OR friendship.friend_id = ?;
        `, [date, date, 1, 1]);

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving Users: ${error}`);
    }
};

export {
    getFriends
}