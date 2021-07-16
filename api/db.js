const mongoose = require("mongoose");

module.exports = {
  connect: (DB_HOST) => {
    // Connect to the db
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);

    mongoose.connect(DB_HOST);

    mongoose.connection.on("error", (err) => {
      console.error(err);
      console.log("Error connecting to MongoDB. Exiting process...");
      // Shut down node process
      process.exit();
    });
  },
  close: () => {
    // Close connection to the db
    mongoose.connection.close();
  },
};
