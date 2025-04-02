const express = require("express");
const TestRouter = require("./routes/TestRouter");
const userRouter = require("./routes/userRouter");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", TestRouter);
app.use("/api", userRouter);

app.listen(3005, () => {
  console.log("👍 | http://localhost:3005");
});
