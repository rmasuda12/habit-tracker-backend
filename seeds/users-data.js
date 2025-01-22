/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
import usersData from "../seed-data/users.js";
import friendData from "../seed-data/friendship.js";
import habitsData from "../seed-data/habits.js";
import habitCompletionData from "../seed-data/habitCompletion.js"
import habitStatsData from "../seed-data/habitStatistics.js";

export async function seed(knex) {
  await knex("users").del();
  await knex("friendship").del();
  await knex("habits").del();
  await knex("habitCompletion").del();
  await knex("habitStats").del();

  await knex("users").insert(usersData);
  await knex("friendship").insert(friendData);
  await knex("habits").insert(habitsData);
  await knex("habitCompletion").insert(habitCompletionData);
  await knex("habitStats").insert(habitStatsData);
}