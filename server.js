require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoRoute = require("./route/todoRoute");
const { pool } = require("./utils/connectDB");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/todos", todoRoute);

const init = async () => {
  //   await client.connect();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

init();
