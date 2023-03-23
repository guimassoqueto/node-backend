import express from 'express';
import { APP_PORT, MONGO_URL } from './settings';
import { usersRoute } from './routes/users.route';
import { errorsRoute } from './routes/errors.route';
import errorManager from './middlewares/errorManager.middleware';
import setCors from './middlewares/setCors.middleware';
import mongoose from 'mongoose';

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(setCors);

// routes
app.use("/users", usersRoute);

// rota com erro proposital
app.use("/errors", errorsRoute);

// middleware que trata todos os erros
app.use(errorManager);
    console.log(`Example app listening on port ${APP_PORT}`);
  })
})
.catch(error => console.error(error))

