// // redisClient.js
// const redis = require("redis");

// // Create and configure the Redis client
// const redisClient = redis.createClient({
//   url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}`,
// });

// // Handle Redis errors
// redisClient.on("error", (err) => {
//   console.error("❌ Redis Error:", err);
// });

// // Connect to Redis
// const connectRedis = async () => {
//   try {
//     await redisClient.connect();
//     console.log("✅ Connected to Redis");
//   } catch (err) {
//     console.error("❌ Redis Connection Failed:", err);
//     process.exit(1); // Exit the process if Redis fails to connect
//   }
// };

// // Export both the client and the connection function
// module.exports = { redisClient, connectRedis };

const redis = require("redis");

const connectRedis = () => {
  const redisClient = redis.createClient({
    url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}`,
  });

  redisClient.on("error", (err) => console.error("Redis Error:", err));

  redisClient.connect()
    .then(() => console.log("✅ Connected to Redis"))
    .catch((err) => console.error("Redis Connection Failed:", err));

  return redisClient;
};

module.exports = { connectRedis };  // Export the connectRedis function
