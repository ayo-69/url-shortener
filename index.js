const express = require("express");
const { disconnectClient, connectClient } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// === Connect to redis
connectClient();

// === Middleware for logging
const morgan = require("morgan");
app.use(morgan("tiny"));

// === Middleware
app.use(express.json());
app.use(express.urlencoded());

// == Routes ==
app.use("/", require("./routes/shortener"));

// === Properly close the app ===
process.on("SIGINT", async () => {
    console.log("Shutting down ...");
    await disconnectClient();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${ PORT }`);
});
