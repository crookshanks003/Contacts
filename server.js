const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/User"));
app.use("/api/contacts", require("./routes/Contacts"));
app.use("/api/login", require("./routes/Login"));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log("Server started"));
