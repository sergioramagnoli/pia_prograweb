const setup = require("./setup");
const express = require("express");
const router = require("./routes/notesRouter");
const cors = require("cors");

setup();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router);

app.listen(3000, () => console.log("server running on http://localhost:3000"));
