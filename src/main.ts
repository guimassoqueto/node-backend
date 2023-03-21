import express from 'express';
import { APP_PORT, MONGO_URL } from './settings';
import { usersRoute } from './routes/users.route';
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

// mongoose
mongoose.connect(MONGO_URL)
.then(() => {
  app.listen(APP_PORT, () => {
    console.log(`Example app listening on port ${APP_PORT}`);
  })
})
.catch(error => console.error(error))

