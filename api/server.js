// common js --> uses require syntax instead of import like the front end
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
const db = require("./db");
const models = require("./models");

// inject envs into global namespace
require("dotenv").config();

// extract env vars
// if no process.env exists use 5000
const port = process.env.PORT || 5000;
const db_host = process.env.DB_HOST;

// Connect to our local mongodb instance
db.connect(db_host);

// start the app, this is a constructor
const app = express();

// create the graphQL server
const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      models,
    };
  },
});

// "apply" graphql to express/app
graphQLServer.applyMiddleware({
  app,
  path: "/api",
});

// home route
app.get("/", (req, res) => res.send("Hello! :)"));

// Listen for requests
app.listen(port, () => {
  console.log(
    `🚀 Server up at: http://localhost:${port}${graphQLServer.graphqlPath}`
  );
});
