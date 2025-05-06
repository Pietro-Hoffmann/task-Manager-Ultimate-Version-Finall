const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/routes/taskRoutes');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


app.use('/', taskRoutes);

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
 
  apis: [
    path.join(__dirname, './src/routes/taskRoutes.js'),
    path.join(__dirname, './src/swagger/definitions.js') 
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
  console.log(`Especificação JSON disponível em http://localhost:${PORT}/swagger.json`);
});