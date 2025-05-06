const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/routes/taskRoutes');

// Inicializando o app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurando as views
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Rotas
app.use('/', taskRoutes);

// Configurando o Swagger - IMPORTANTE: deve ser após a definição das rotas
// Crie a pasta src/swagger e coloque o arquivo definitions.js nela
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
  // Especificando explicitamente o arquivo de rota e um arquivo de definições adicional
  apis: [
    path.join(__dirname, './src/routes/taskRoutes.js'),
    path.join(__dirname, './src/swagger/definitions.js') // Novo arquivo com definições Swagger
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Interface para a documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota para o arquivo JSON da especificação (útil para depuração)
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
  console.log(`Especificação JSON disponível em http://localhost:${PORT}/swagger.json`);
});