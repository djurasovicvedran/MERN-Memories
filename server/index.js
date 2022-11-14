import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

import dotenv from "dotenv";

// initialize app
const app = express();
dotenv.config();

// limit image size
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
// starting path for all the routes inside posts.js

app.use("/posts", postRoutes);
// users routes
app.use("/user", userRoutes);

// connect to a database
// credentials must go into .env folder which must not be uploaded (add to gitignore)

app.get("/", (req, res) => res.send("Hello to memories API"));
const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));

//mongoose.set("useFindAndModify", false);
