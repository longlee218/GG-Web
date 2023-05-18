require("dotenv").config();
require("./config/db");
require("./config/redis");

const PORT = process.env.PORT;

const io = require("./config/socketio")
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser')
const requestIp = require('request-ip');
const Router = require("./src/routers");
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(requestIp.mw())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(
  Router
);
const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Redis Connected!")
  io.init(server);
});
server.setTimeout(35000);
