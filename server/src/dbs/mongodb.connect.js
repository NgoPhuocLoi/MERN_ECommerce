const mongoose = require("mongoose");

class MongoDB {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("MongoDB is connected!");
      })
      .catch((err) => {
        console.log("Error when connecting to MongoDB. Error: " + err);
      });
  }

  static getInstance() {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }
}

const instanceMongoDB = MongoDB.getInstance();

return instanceMongoDB;
