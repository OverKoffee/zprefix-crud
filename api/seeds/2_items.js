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
      item_name: "Mechanical Bull",
      description:
        "A mechanical bull, also known as a bucking machine, is a device that replicates the sensation of riding a bucking animal, such as a rodeo bull or horse, popularized by Sherwood Cryer. It is usually powered by a variable-speed electric motor. Padded flooring is often installed around the equipment in order to reduce the likelihood of injury to those thrown off it.",
      quantity: 100,
    },
    {
      user_id: 1,
      item_name: "Renaissance Oily",
      description:
        "Italian Renaissance painting is the painting of the period beginning in the late 13th century and flourishing from the early 15th to late 16th centuries, occurring in the Italian Peninsula, which was at that time divided into many political states, some independent but others controlled by external powers. ",
      quantity: 10,
    },
    {
      user_id: 2,
      item_name: "Album - No More Tears",
      description:
        "No More Tears is the sixth studio album by the English heavy metal singer Ozzy Osbourne. Released on 17 September 1991, the album charted at number 17 on the UK Albums Chart and number seven on the US Billboard 200 albums chart.",
      quantity: 5,
    },
    {
      user_id: 2,
      item_name: "Album - Bark at the Moon",
      description:
        "Bark at the Moon is the third studio album by the English heavy metal singer Ozzy Osbourne, released in 14 November 1983 in the US and on 2 December 1983 in the UK. The album marks Ozzy's change to a synth-infused pop-metal sound, with both its sonic production and in Ozzy's imaging.",
      quantity: 1,
    },
  ]);
};
