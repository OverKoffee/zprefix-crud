/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();
  await knex("items").insert([
    {
      user_id: 1,
      item_name: "renaissance oily",
      description: "super cool desc.. suhhh",
      quantity: 10,
    },
  ]);
};
