const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Tarefas',
      version: '1.0.0',
      description: 'API para criar, listar, atualizar e excluir tarefas',
      contact: {
        name: 'Desenvolvedor',
        email: 'dev@exemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
  },
  
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/models/*.js']
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);


const setupSwagger = (app) => {
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  console.log(`Documentação Swagger disponível em http://localhost:${process.env.PORT || 3000}/api-docs`);
};

module.exports = setupSwagger;