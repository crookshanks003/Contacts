const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const conn = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("database connected!!");
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = conn;
