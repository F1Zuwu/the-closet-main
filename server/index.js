const express = require("express");
const TestRouter = require("./routes/TestRouter");
const userRouter = require("./routes/userRouter");
const corsHandler = require('./middleware/cors');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(corsHandler)

app.use("/api", TestRouter);
app.use("/api", userRouter);

app.listen(3005, () => {
  console.log("👍 | http://localhost:3005");
});
