import dotenv from 'dotenv';
dotenv.config();

export const APP_PORT = parseInt(process.env.APP_PORT!);