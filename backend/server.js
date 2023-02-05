/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function main() {
  // -----------------------------------   Mongo DB ---------------------------------------
  //   mongoose.set("strictQuery", false);
  await mongoose
    .connect(
      `mongodb+srv://Lucky2892000:${process.env.PASSWORD}@cluster0.pkzwryk.mongodb.net/?retryWrites=true&w=majority`

    )
    .then((value) => {
      // console.log(value);
      console.log("successfully connected with mongoose");
    })
    .catch((err) => {
      console.log("There is an error connecting to mongoose");
      console.log(err);
    });

  const userSchema = mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
    },
    { timestamps: true }
  );
  const User = mongoose.model("user", userSchema);

  app
    .route("/user")
    .get(async (req, res) => {
      res.send(await User.find({}));
    })
    .post(async (req, res) => {
      const isUserAlreadyExists = await User.findOne({ email: req.body.email });

      if (isUserAlreadyExists) {
        res.send("user already exists");
        return;
      }
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      user.save();
      res.send("successfully added to database");
    });
}

main().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} `);
});
