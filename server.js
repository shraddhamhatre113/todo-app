import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Low, JSONFile } from 'lowdb';

import { mainErrorHandler, noRouteHandler } from './middlewares/errorHandle.middleware.js';
import { userRouter } from './routers/users.router.js';

import * as dotenv from 'dotenv'

dotenv.config()
// create server
let app = express();
// lowdb database
const adapter = new JSONFile('db.json');
export const db = new Low(adapter);
await db.read();
// initialize database
db.data || { users: [] };
// core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));
// routers
app.use('/users', userRouter)
// error handler undefined routes
app.use(noRouteHandler);
// main error handler
app.use(mainErrorHandler);
// port

const dbPassword = process.env.DB_PASS;
const email = process.env.EMAIL;

//port
const port = process.env.PORT||8000;
app.listen(port, console.log(`server is up on port: ${port}. 👻`));
