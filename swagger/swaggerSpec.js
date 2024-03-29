const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Property API',
    version: '1.0.0',
    description: 'Capstone-Project-Backend',
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
  security: [{
      bearerAuth: []
  }],
  servers: [
    {
      url: process.env.BASE_URL || "http://localhost:3000",
    },
  ],
  tags: [
    {
      name: 'Momo PropertyPro API',
      description: 'API for Momo property posts',
    },
  ],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const options = {
  definition: swaggerDocument,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

exports.default = swaggerSpec;