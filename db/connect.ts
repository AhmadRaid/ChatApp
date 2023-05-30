const mongoose = require("mongoose");
import {server} from "../server";
require("dotenv").config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);

const connectDB = async () => {
  await mongoose
    .connect(process.env.mongoUrl, connectionParams)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err: any) => {
      console.error(`Error connecting to the database. n${err}`);
    });
};
connectDB();

server
  .listen(3001, () => {
    console.log(`Server is running on localhost:3001`);
  })
  .on("error", (err) => {
    console.log(err);
    process.exit(1);
  });
