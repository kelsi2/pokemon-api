const { gql } = require("apollo-server-express");

// commonjs export syntax
// TYPE DEFINITIONS
module.exports = gql`
  # QUERIES
  type Query {
    pokemon(name: String, id: ID): Pokemon!
    pokemonCount: Int!
  }

  # MUTATIONS
  type Mutation {
    # Comments
    createComment(
      pokemonId: ID!
      text: String!
      author: String
      upvotes: Int
      downvotes: Int
    ): Comment!
    updateComment(
      commentId: ID!
      pokemonId: ID!
      text: String!
      author: String
      upvotes: Int
      downvotes: Int
    ): Comment!
    deleteComment(commentId: ID!): Comment!
  }

  # TYPES
  type Pokemon {
    id: ID!
    api_id: ID!
    name: String!
    base_experience: Int!
    height: Int!
    is_default: Boolean!
    order: Int!
    weight: Int!
    location_area_encounters: String!
    sprites: PokemonSprites!
    comments: [ID!]!
  }

  type Comment {
    id: ID!
    author: String
    upvotes: Int
    downvotes: Int
    text: String!
    pokemon_id: ID!
    createdAt: String!
    updatedAt: String!
  }

  type PokemonSprites {
    front_default: String!
    front_shiny: String!
    front_female: String!
    front_shiny_female: String!

    back_default: String!
    back_shiny: String!
    back_female: String!
    back_shiny_female: String!
  }
`;
