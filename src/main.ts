import express from 'express';
import { APP_PORT } from './settings';

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.listen(APP_PORT, () => {
  console.log(`Example app listening on port ${APP_PORT}`);
})