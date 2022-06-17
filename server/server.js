const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const con = require("./Config/database");
con();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use("/public", express.static("public"));

const memberRoutes = require("./Routes/memberRoutes");
const membershipRoutes = require("./Routes/membershipRoutes");
const dashboardRoutes = require("./Routes/dashboardRoutes");
const userRoutes = require("./Routes/userRoutes");
app.use("/members", memberRoutes);
app.use("/membership", membershipRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
