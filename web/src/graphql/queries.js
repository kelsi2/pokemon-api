import { gql } from "@apollo/client";

const GET_POKEMON = gql`
  query pokemon($id: ID, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      api_id
      name
      base_experience
      height
      weight
      is_default
      order
      location_area_encounters
      sprites {
        front_default
      }
    }
  }
`;

export { GET_POKEMON };
