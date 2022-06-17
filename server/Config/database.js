const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(
    "mongodb://localhost:27017/RaoGyms",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Mongodb database started...");
    },
  );
};

module.exports = connectDatabase;
