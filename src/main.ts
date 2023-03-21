import express from 'express';
import { PORT } from './settings';

const app = express();


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})