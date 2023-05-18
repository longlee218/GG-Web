const { exec } = require("child_process");
const mongoose = require("mongoose");
exec("systemctl restart mongod");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
    exec("systemctl restart mongod");
    // exec("pm2 restart 0");
  });
