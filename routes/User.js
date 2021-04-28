const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
    "/",
    [
        check("name", "Please add name").not().isEmpty(),
        check("email", "Please enter valid email").isEmail(),
        check(
            "password",
            "Password must be atleast 6 characters long"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "User already exist", type: "register" });
        }
        try {
            user = new User({ name, email, password });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.save();

            jwt.sign(
                {
                    user: {
                        id: user.id,
                    },
                },
                config.get("jwtSecret"),
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
        } catch (err) {
            res.status(500).json({ msg: "Server error" });
            console.log(err.message);
        }
    }
);

module.exports = router;
