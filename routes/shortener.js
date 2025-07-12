const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const URL = require("../models/URL");
const { shortenerSchema } = require("../utils/validationSchemas");
const auth = require("../middleware/auth");
require("dotenv").config();

// Shortens a URL
/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Shorten a URL
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               URL:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shortened URL already exists
 *       201:
 *         description: Successfully shortened URL
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
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

// GET / - Get all URLs a user 
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all of a user's URLs
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urls:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/URL'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No URLs found
 *       500:
 *         description: Server error
 */
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
// Shortens a URL
/**
 * @swagger
 * /{hashedURL}:
 *   get:
 *     summary: Redirect to the original URL
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: hashedURL
 *         schema:
 *           type: string
 *         required: true
 *         description: The shortened URL hash
 *     responses:
 *       302:
 *         description: Redirecting to original URL
 *       404:
 *         description: No URL found
 *       500:
 *         description: Server error
 */
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