const express = require("express");
const app = express();
require("./models/dbConfig");

// const postsRoutes = require("./routes/postsController");

// const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const groupRoutes = require("./routes/groups");
const programRoutes = require("./routes/programs");
// const cors = require("cors");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Origin, Content, Accept, Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/programs", programRoutes);
// app.use(cors());

app.listen(5500, () => {
  console.log("Server started: 5500");
});
