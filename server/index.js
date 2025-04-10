const express = require("express");
const TestRouter = require("./routes/TestRouter");
const userRouter = require("./routes/userRouter");
const clothingRouter = require("./routes/clothingRouter");
const accessoryRouter = require("./routes/accessoryRouter");
const tagRouter = require("./routes/tagRouter");
const corsHandler = require('./middleware/cors');
const fitRouter = require("./routes/fitRouter");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(corsHandler)

app.use("/api", TestRouter);
app.use("/api", userRouter);
app.use("/api", clothingRouter);
app.use("/api", accessoryRouter);
app.use("/api", tagRouter)
app.use("/api", fitRouter)

app.listen(3005, () => {
  console.log("👍 | http://localhost:3005");
});
