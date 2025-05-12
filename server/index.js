const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const TestRouter = require("./routes/TestRouter");
const userRouter = require("./routes/userRouter");
const clothingRouter = require("./routes/clothingRouter");
const accessoryRouter = require("./routes/accessoryRouter");
const tagRouter = require("./routes/tagRouter");
const fitRouter = require("./routes/fitRouter");
const searchRoutes = require('./routes/search');

const corsHandler = require('./middleware/cors');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(corsHandler)

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "The Closet API",
      version: "1.0.0",
      description: "API documentation for The Closet project",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", TestRouter);
app.use("/api", userRouter);
app.use("/api", clothingRouter);
app.use("/api", accessoryRouter);
app.use("/api", tagRouter)
app.use("/api", fitRouter)
app.use('/api', searchRoutes);


app.listen(3005, () => {
  console.log("👍 | http://localhost:3005");
  console.log("📘 | Swagger docs at http://localhost:3005/api-docs");
});

module.exports = app
