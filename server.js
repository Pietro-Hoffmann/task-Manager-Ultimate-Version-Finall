const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const setupSwagger = require('./swagger');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


setupSwagger(app);


app.use('/', taskRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});