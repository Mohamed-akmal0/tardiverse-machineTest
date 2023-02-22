const express = require("express");
const app = express();
const { json } = require("express");
require("dotenv").config();
const cookie = require("cookie-parser");
const connectDB = require("./config/dbConnection");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoute");

const port = process.env.PORT;

//database connection calling
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "*",
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`port is running at ${port}`);
});

app.use(json());
app.use(cookie());
app.use("/api/admin", adminRoutes);
