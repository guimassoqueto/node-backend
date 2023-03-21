import express from 'express';
import { APP_PORT } from './settings';

const app = express();


app.listen(APP_PORT, () => {
  console.log(`Example app listening on port ${APP_PORT}`);
})