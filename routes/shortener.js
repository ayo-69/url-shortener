const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { client } = require("../config/db");
require("dotenv").config();

// Shortens a URL 
router.post("/shorten", async (req, res) => {
    const { URL } = req.body;

    // Hash the URL and shorten it
    const hashedURL = crypto.createHash("sha256").update(URL).digest("hex").substring(0, 8);

    // Store on redis
    await client.set(hashedURL, URL);

    res.status(201).json({
        message: "Successfully shortened URL",
        shortenedUrl: `${process.env.BASE_URL}/${hashedURL}`
    });
});

// Get key
router.get("/:hashedURL", async (req, res) => {
    const { hashedURL } = req.params;
    const URL = await client.get(hashedURL);
    if (!URL) { return res.status(401).json({ error: "URL not found"}); }

    res.redirect(URL);
});

module.exports = router;