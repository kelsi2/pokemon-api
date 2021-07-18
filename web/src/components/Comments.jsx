import React from "react";
import { useQuery } from "@apollo/client";

const Comments = ({ id }) => {
  const { loading, error, data } = useQuery(GET_POKEMON_COMMENTS);
  return <div></div>;
};

export default Comments;
