import { countConnect } from "../helpers/check.connect";
import mongoose from "mongoose";

const connectString = "mongodb://127.0.0.1:27017/shopDev";

class Database {
  static instance: Database;
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(connectString)
      .then(() => console.log("====> Connected MongoDb", countConnect()))
      .catch((error) => console.log("=====> Connect Error"));
  }

  static getInstance() {
    if(!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

// const instance = Database.getInstance();

export default Database;