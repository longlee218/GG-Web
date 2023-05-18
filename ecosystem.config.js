module.exports = {
  apps : [{
    name   : "API TOCCHIENSTORE",
    script : "./server.js",
    watch: ["./src"],
    // ignore_watch: ["./data"],
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    }
  }]
}