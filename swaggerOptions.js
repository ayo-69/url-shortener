module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Url Shortener',
      version: '0.1.0',
      description: 'A basic url shortener',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        URL: {
          type: 'object',
          properties: {
            originalUrl: {
              type: 'string'
            },
            shortUrl: {
              type: 'string'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            clicks: {
              type: 'number'
            },
            user: {
              type: 'string'
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            username: {
              type: 'string'
            },
            password: {
              type: 'string',
              format: 'password'
            }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js'], // Path to your route files with JSDoc comments
};
""
