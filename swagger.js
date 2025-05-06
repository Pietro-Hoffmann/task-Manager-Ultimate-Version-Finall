const path = require('path');
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
  
  // Usando caminhos absolutos para garantir que os arquivos sejam encontrados
  apis: [
    path.join(__dirname, './src/routes/taskRoutes.js'), 
    // Se você tiver apenas um arquivo específico de rotas, especifique-o diretamente:
    // path.join(__dirname, './src/controllers/taskController.js'),
    // path.join(__dirname, './src/models/taskModel.js')
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  // Interface para a documentação
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Rota para o arquivo JSON da especificação (útil para depuração)
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  console.log(`Documentação Swagger disponível em http://localhost:${process.env.PORT || 3000}/api-docs`);
  console.log(`Especificação JSON disponível em http://localhost:${process.env.PORT || 3000}/swagger.json`);
};

module.exports = setupSwagger;