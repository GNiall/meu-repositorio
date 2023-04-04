require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./router");

const app = express();

app.use(express.json(), cors(), router);

app.listen(process.env.PORT);
