import dotenv from 'dotenv';
dotenv.config();

const MONGO_ROOT_USERNAME = process.env.MONGO_ROOT_USERNAME || "user";
const MONGO_ROOT_PASSWORD = process.env.MONGO_ROOT_PASSWORD || "password";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "test";
const MONGO_HOST = process.env.MONGO_HOST || "0.0.0.0";
const MONGO_PORT = process.env.MONGO_PORT || "27017";

export const TOKEN_NAME = "node-backend";

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const AWS_REGION = process.env.AWS_REGION || "";
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || "";

export const APP_PORT = parseInt(process.env.APP_PORT!);
export const MONGO_URL = `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;