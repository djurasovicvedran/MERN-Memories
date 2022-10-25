import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

// initialize app
const app = express();

// limit image size
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
// starting path for all the routes inside posts.js

app.use("/posts", postRoutes);
// connect to a database
// credentials must go into .env folder which must not be uploaded (add to gitignore)
const CONNECTION_URL =
  "mongodb+srv://MemoriesAdmin:MemoriesAdmin123@cluster0.l8jxj6g.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));

//mongoose.set("useFindAndModify", false);
