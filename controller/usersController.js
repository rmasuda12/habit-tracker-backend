import initKnex from "knex";
import config from "../knexfile.js";
const knex = initKnex(config);

const getUsers = async(req, res) => {
    try {
        const data = await knex("users");
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving Users: ${error}`);
    }
};

const getUser = async(req, res) => {
    try {
        console.log("arrived at finding user");
        const data = await knex('users').where('users.id', req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving User: ${error}`);
    }
}

export {
    getUsers,
    getUser
}