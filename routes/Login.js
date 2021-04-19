const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const auth = require("./Auth");
const config = require("config");

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
});

router.post(
    "/",
    [
        check("email", "Please enter valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: "User does not exist" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Authentication failed" });
            }

            jwt.sign(
                {
                    user: {
                        id: user.id,
                    },
                },
                config.get("jwtSecret"),
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Server error" });
        }
    }
);

module.exports = router;
