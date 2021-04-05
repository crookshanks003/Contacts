const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
    res.send("Api thing");
})

module.exports = router