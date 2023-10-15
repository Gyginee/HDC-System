const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    
  swaggerDefinition: {
    
    info: {
        openapi: '3.1.0', 
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
        description:
          'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
        license: {
          name: 'Licensed Under MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'JSONPlaceholder',
          url: 'https://jsonplaceholder.typicode.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
    ]
  },
 
  apis: [`${__dirname}/routers/test.js`], // Đường dẫn đến các file chứa API routes
  
};


const specs = swaggerJsdoc(options);

module.exports = specs;
