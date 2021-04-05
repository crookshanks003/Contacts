const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send("Get contacts");
})

router.post('/', (req,res) => {
    res.send("Add contact");
})

router.put('/:id', (req,res) => {
    res.send("contact updated")
})

router.delete('/:id', (req,res) => {
    res.send("contact deleted")
})

module.exports = router