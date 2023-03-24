import express from 'express';
import { usersRoute } from './routes/users.route';
import { errorsRoute } from './routes/errors.route';
import errorManager from './middlewares/errorManager.middleware';
import setCors from './middlewares/setCors.middleware';
import { mongoConnector } from './database/mongoConnector.database';
import { APP_PORT } from './settings';
import morgan from 'morgan';

const app = express();


// CORS
app.use(setCors);

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// morgan
app.use(morgan("dev"));

// routes
app.use("/users", usersRoute);
app.use("/errors", errorsRoute); // rota com erro proposital

// middleware que trata todos os erros
app.use(errorManager);

// inicia a aplicação
(async function main() {
  try {

    await mongoConnector;
    app.listen(APP_PORT, () => {
      console.log("Connected. Listening to port", APP_PORT)
    })

  } catch (error) {

    console.error("\x1b[31m", 
    "Erro ao conectar-se ao banco de dados.\n",
    "Verifique se a variável MONGO_HOST está corretamente definida em .env");

  }
})()