// Import the mongoose module
const mongoose = require("mongoose");
require('dotenv').config()


// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoConnectUrl =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority`;

// Wait for database to connect, logging an error if there is a problem
async function connect() {
  try {
    await mongoose.connect(mongoConnectUrl);
  } catch (err) {
    console.error("Error connecting mongodb");
    console.error(err);
  }
}

module.exports = { connect };
