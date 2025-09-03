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
    {
      user_id: 1,
      item_name: "marine crayons",
      description:
        "President Donald Trump took aim at Chinese leader Xi Jinping as he hosted foreign leaders at a major military parade in Beijing, a reminder of the lingering tensions between the two sides over trade, tech and other issues.",
      quantity: 10,
    },
    {
      user_id: 1,
      item_name: "Krispy Kreme Donut",
      description:
        "A super umptiously diddlyumptious choco glazed donuts that melt in zee mouth.",
      quantity: 12,
    },
  ]);
};
