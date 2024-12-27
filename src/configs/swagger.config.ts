const url = `http://localhost:${process.env.PORT || 8000}`;

const definition = {
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
};

const swaggerUserOption = {
  definition,
  apis: [ "src/openapi/paths/**/*.yaml", "src/openapi/components/**/*.yaml", "src/openapi/tags/**/*.yaml"],
};

const swaggerShopOption = {
  definition,
  apis: [ "src/openapi/paths/**/*.yaml", "src/openapi/components/**/*.yaml", "src/openapi/tags/**/*.yaml"],
};

const swaggerAdminOption = {
  definition,
  apis: [ "src/openapi/paths/**/*.yaml", "src/openapi/components/**/*.yaml", "src/openapi/tags/**/*.yaml"],
};
export { swaggerUserOption, swaggerShopOption, swaggerAdminOption };
