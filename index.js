const express = require("express");
const fs = require("fs");
const model = require("./models/user")
const {connectMongoDb} = require("./connection")

const userRouter = require("./routes/user");
const app = express();
const port = 8000;


// Connection 
connectMongoDb("mongodb://localhost:27017/protect-01", (err)=> console.log("err"))

app.use(express.urlencoded({ extended: false }));

// Middleware for logging
// app.use((req, res, next) => {
//     console.log("hello from middleware1");
//     fs.appendFile("log.txt", `\n${Date.now()}: ${req.ip}, ${req.method}: ${req.path}`, (err) => {
//         if (err) {
//             console.error("Failed to log request:", err);
//         }
//         next();
//     });
// });

// app.use((req, res, next) => {
//     console.log("hello from middleware2");
//     next();
// });



// Routes
app.use("/api/users", userRouter)

app.use((req, res) => {
    res.status(404).send('Not Found');
});


app.listen(port, () => console.log(`Server started on port ${port}`));
