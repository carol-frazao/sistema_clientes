import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routes/index.js';
import sequelize from './src/config/database.js';

const app = express();
const PORT = process.env.PORT;

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

// Middlewares
app.use(cors()); // Habilita CORS
app.use(bodyParser.json()); // Permite que as requisições POST enviem JSON

// Rotas
app.use('/', router);

// Sincronizar os modelos e iniciar o servidor
sequelize.sync({ force: false }) // force: false não recria a tabela se já existir
  .then(() => {
    console.log('Sincronização com o banco de dados completa.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar os modelos do Sequelize:', err);
  });