const mongoose = require("mongoose");

// Build the schema
const PokemonSchema = new mongoose.Schema({
  api_id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  base_experience: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  is_default: {
    type: Boolean,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  location_area_encounters: {
    type: String,
    required: true,
  },
  sprites: {
    // This doesn't need its own table because each pokemon has their own sprites, they aren't shared by many pokemon
    type: Object,
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

// Create a model from this schema
module.exports = mongoose.model("Pokemon", PokemonSchema);
