// const url = 'http://128.199.232.195'
const url = `http://localhost:${process.env.PORT || 8000}`;

const swaggerOption = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "nextcargo API documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${url}/api/v1`,
      },
      // {
      //   url: `${url}/api/v2`,
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["src/openapi/**/*.yaml", "src/openapi/path/**/*.yaml"],
};
export { swaggerOption };
