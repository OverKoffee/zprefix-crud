/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      first_name: "Bob",
      last_name: "Ross",
      username: "bross",
      password: "painting",
    },
    {
      first_name: "Ozzy",
      last_name: "Ozbourne",
      username: "ozzy",
      password: "rocks",
    },
  ]);
};
