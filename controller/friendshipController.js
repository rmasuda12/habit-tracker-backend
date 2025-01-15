import initKnex from "knex";
import config from "../knexfile.js";
const knex = initKnex(config);

const getFriends = async(req, res) => {
    try {
        const data = await knex("users");
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving Users: ${error}`);
    }
};

// const newUser = async(req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }

export {
    getFriends,
}