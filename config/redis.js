const Redis = require("ioredis")
const redisClient = new Redis({
  port: 6111, // Redis port
  host: "149.28.128.246", // Redis host
  // username: "default", // needs Redis >= 6
  password: "LoveYou11223366",
  db: 0, // Defaults to 0
  maxRetriesPerRequest: null,
  enableReadyCheck: false
});

module.exports = redisClient