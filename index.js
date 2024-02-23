require("dotenv").config();
const { handleInvalidJson, handleUnauthorized, handleNotFound, handleAllOtherErrors } = require("./errors/errorHandler");
const morganMiddleware = require("./logging/morganMiddleware");
const Logger = require("./logging/logger");

// Database
const db = require("./db");
// create tables
const models = require("./models");
models.init();

// start up app services
const express = require("express");
const app = express();

// morganMiddleware is a middleware function that logs requests to the console
app.use(morganMiddleware);

// parse incoming data as json
app.use(express.json());

//Serves static files (we need it to import a css file)
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); 

// Swagger in dev mode
if (process.env.NODE_ENV === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = require('./swagger/swaggerSpec');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.default));
}

// // Routes
app.use("/api/users", require("./routes/userRoutes"));
// add post routes
app.use("/api/posts", require("./routes/postRoutes"));
// add comment routes
app.use("/api/comments", require("./routes/commentRoutes"));
// add like routes
app.use("/api/likes", require("./routes/likeRoutes"));
// add property routes
app.use("/api/property", require("./routes/propertyRoutes"));
// add images routes
app.use("/api/images", require("./routes/imageRoutes"));
// add view user routes
app.use("/users", require("./routes/viewUserRoutes"));

app.get("/", (req, res) => {
  res.send("hello world");
});

// Add error handler middleware functions to the pipeline
app.use(handleInvalidJson);
app.use(handleUnauthorized);
app.use(handleNotFound);
app.use(handleAllOtherErrors);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  Logger.debug(`Example app listening on port ${port}!`);
});