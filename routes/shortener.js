const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const URL = require("../models/URL");
const { shortenerSchema } = require("../utils/validationSchemas");
const auth = require("../middleware/auth");
require("dotenv").config();

// Shortens a URL
router.post("/shorten", auth, async (req, res) => {
    const { error } = shortenerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { URL: originalUrl } = req.body;

    const shortUrl = crypto.createHash("sha256").update(originalUrl + req.user.username).digest("hex").substring(0, 8);

    try {
        let url = await URL.findOne({ shortUrl });

        if (url) {
            res.status(200).json({
                message: "Shortened URL already exists",
                url: `${process.env.BASE_URL}/${shortUrl}`
            });
        } else {
            const newURL = new URL({
                originalUrl,
                shortUrl,
                user: req.user.id,
            });

            await newURL.save();
            res.status(201).json({
                message: "Successfully shortened URL",
                url: `${process.env.BASE_URL}/${shortUrl}`
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
    }
});

// GET / - Get all user URLs
router.get("/", auth, async (req, res) => {
    try {
        const urls = await URL.findOne({ user: req.user.id });

        if (urls) {
            return res.status(200).json({ urls })
        } else {
            return res.status(404).json({ message: "No url found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /:key
router.get("/:hashedURL", async (req, res) => {
    try {
        const url = await URL.findOne({ shortUrl: req.params.hashedURL });

        if (url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ message: "No url found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;