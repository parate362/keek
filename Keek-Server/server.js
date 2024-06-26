const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db/conn");
const userRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://keek-ten.vercel.app"], // Add your new origin here
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.get("/", (req, res) => {
  res.send("Hello Keek!");
});

app.use("/api/user", userRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listen on port${port}...`));
