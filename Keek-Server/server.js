const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db/conn");
const userRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());

const allowedOrigins = ['https://keek-ten.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.get("/", (req, res) => {
  res.send("Hello Keek!");
});

app.use("/api/user", userRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listen on port${port}...`));
