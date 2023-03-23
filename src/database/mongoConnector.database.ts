import mongoose from 'mongoose';
import { MONGO_URL } from '../settings';

export const mongoConnector = mongoose.connect(MONGO_URL, {
  autoIndex: false,
  maxPoolSize: 1,
  serverSelectionTimeoutMS: 1500,
  socketTimeoutMS: 45000,
  family: 4
});