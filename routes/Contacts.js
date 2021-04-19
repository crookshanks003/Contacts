const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("./Auth");
const Contact = require("../models/Contact");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(contacts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.post(
    "/",
    [auth, [check("name", "Name is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const { name, email, phone, type } = req.body;
        try {
            const newContact = new Contact({
                email,
                phone,
                name,
                type,
                user: req.user.id,
            });
            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("server error");
        }
    }
);

router.put("/:id", auth, async (req, res) => {
    const { name, email, type, phone } = req.body;

    const fields = {};

    if (name) fields.name = name;
    if (email) fields.email = email;
    if (phone) fields.phone = phone;
    if (type) fields.type = type;

    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    if (req.user.id !== contact.user.toString()) {
        return res.status(401).json({ message: "Not Authorized" });
    }
    try {
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: fields },
            { new: true }
        );
        res.json(contact);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

router.delete("/:id", auth, async (req, res) => {
    let contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({error: "Contact not found"})
    if (req.user.id !== contact.user.toString()) {
        return res.status(401).json({ message: "Not Authorized" });
    }
    try {
        await Contact.findByIdAndRemove(req.params.id);
        res.json({message: "Contact Removed"}) 
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }

});


module.exports = router;
