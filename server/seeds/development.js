/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // truncate
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex.raw('TRUNCATE TABLE "notes" CASCADE');
  // Deletes ALL existing entries

  const createUsers = () => {
    return [
      { username: "ramagnoli", first_name: "Sergio", last_name: "Ramagnoli" },
      { username: "otto", first_name: "Otto", last_name: "Hightower" },
    ];
  };

  const createNotes = () => {
    return [
      {
        title: "Name's Jezal, and yes: I am a coward",
        body: "I dont know what else to say: I'm a coward, but I try to do things right",
        type: "text",
        owner_id: "1",
      },
      {
        title: "Name's Ninefingers",
        body: "Say one thing about Logen Ninefingers, say he is a coward",
        type: "text",
        owner_id: "1",
      },
      {
        title: "Hiya, it's the goat again",
        body: "I bet by now you are so confused, but just as the elephant said: that's not my problem, bro",
        type: "text",
        owner_id: "1",
      },
      {
        title: "The Postgres Elephant",
        body: "Hiya, I'm an elephant. You don't believe me? That's not my problem",
        type: "text",
        owner_id: "1",
      },
      {
        title: "I'm a mosquito",
        body: "Imma suck your blood, bro. Why, you say? Coz that's what I do, bro, o gotta earn a life, is really that simple",
        type: "text",
        owner_id: "1",
      },
      {
        title: "Or a unicorn?",
        body: "What if I tell you, you've been fooled, and all this time I've been a unicorn of FFyL. I would bet that you weren't expecting that, 'cause you've been fooled yet another time, I'm just a ñu. I know, I know, you think I'm just like a bull",
        type: "text",
        owner_id: "1",
      },
      {
        title: "This time is an otter",
        body: "Yeah, I'm an otter, I'm the one writing this",
        type: "text",
        owner_id: "1",
      },
      {
        title: "Heya, I'm a goat",
        body: "That's all you need to know for now, my friend. Otherwise, it could be dangerous",
        type: "text",
        owner_id: "1",
      },
    ];
  };

  await knex("users").insert(createUsers());
  return knex("notes").insert(createNotes());
};
