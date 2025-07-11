const { createClient } = require("redis");
require("dotenv").config();

const client = createClient({
    url: process.env.REDIS_URL
})

client.on("error", (err) => console.error("REDIS Error : ", err));

async function connectClient() {
    await client.connect();
    console.log("Connected to REDIS")
}

async function disconnectClient() {
    await client.disconnectClient();
    console.log("Disconnected to REDIS")
}

module.exports = {
    client,
    connectClient,
    disconnectClient
}
