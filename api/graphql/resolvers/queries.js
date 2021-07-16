const got = require("got");

const apiUrlForIds = "https://pokeapi.co/api/v2/pokemon/";

module.exports = {
  pokemon: async (parent, { name, id }, { models }) => {
    // PRE: Check if in local db/cached?
    const searchQuery = {};

    if (Number.isInteger(+id)) {
      // Search by API ID
      searchQuery.api_id = id;
    } else if (id) {
      // Search by Mongo ID
      searchQuery._id = id;
    } else if (name) {
      // Search by name
      searchQuery.name = name;
    }

    // .exec returns a promise instead of the mongo object
    const pokemon = await models.Pokemon.findOne(searchQuery).exec();

    // Pokemon is cached, send back cached pokemon from our db
    if (pokemon) {
      console.log(`${pokemon.name} found in cache`);
      return pokemon;
    }

    // Pokemon not in cache...gotta catch 'em!
    console.log(`${name} not found in cache...catching 'em!`);

    // 1. Extract name/id from args
    // 2. Make request to pokeapi for name or id
    let response;

    try {
      response = await got(`${apiUrlForIds}${name || id}`);
    } catch (error) {
      throwDefaultFormattedError(error);
    }

    // 3. Parse the response
    const result = JSON.parse(response.body);

    // 3.5 Cache the result in our local mongodb
    // Create does not require .exec
    result.api_id = id;
    await models.Pokemon.create(result);

    // 4. Send JSON response to the client
    return result;
  },
  pokemonCount: async (parent, args, { models }) => {
    // Return count of pokemon in db
    return await models.Pokemon.count().exec();
  },
};

const throwDefaultFormattedError = (error) => {
  throw new Error(`Error: ${error.statusCode} - ${error.statusMessage}`);
};
