const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// === Middleware for logging
const morgan = require("morgan");
app.use(morgan("tiny"));

// === Middleware
app.use(express.json());
app.use(express.urlencoded());

// == Routes ==
app.use("/", require("./routes/shortener"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${ PORT }`);
});
