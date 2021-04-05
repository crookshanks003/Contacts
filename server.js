const express = require("express");

const app = express();

app.get('/', (req,res) => res.send("Hello World"))

app.use('/api/users', require("./routes/User"))
app.use('/api/contacts', require("./routes/Contacts"))
app.use('/api/auth', require("./routes/Auth"))

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log("Server started"));