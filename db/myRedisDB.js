const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();
client.on("error", console.error);

client.p_hset = promisify(client.hset).bind(client);
client.p_hgetall = promisify(client.hgetall).bind(client);

async function createUser(username, hashedPassword, name, salt) {
  console.log("creating user", username);
  return await client.p_hset(
    "user:" + username,
    "username",
    username,
    "hashedPassword",
    hashedPassword,
    "name",
    name,
    "salt",
    salt
  );
}

async function getUser(username) {
  return await client.p_hgetall("user:" + username);
}

module.exports.createUser = createUser;
module.exports.getUser = getUser;
