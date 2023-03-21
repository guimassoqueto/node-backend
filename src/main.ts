import express, { Request, Response, NextFunction } from 'express';
import { APP_PORT } from './settings';
import { usersRoute } from './routes/users.route';
import setCors from './middlewares/setCors.middleware';

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(setCors);

// routes
app.use("/users", usersRoute);

app.listen(APP_PORT, () => {
  console.log(`Example app listening on port ${APP_PORT}`);
})