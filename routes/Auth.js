const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send("User logged in");
})

router.post('/', (req,res) => {
    res.send("User log in");
})

module.exports = router