const express = require("express");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDocs = require("swagger-jsdoc");

const swaggerOptions = require("./swaggerOptions");

const specs = swaggerJSDocs(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 3000;

// === Documentation ===
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

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
    console.log(`Swagger docs at http://localhost:${PORT}/docs`);
});
