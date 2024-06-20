const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Database connected")).catch((err) => console.error("Error connecting to database:", err));
