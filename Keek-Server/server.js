const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db/conn");
const userRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://keek-nine.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/api/user", userRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listen on port${port}...`));
