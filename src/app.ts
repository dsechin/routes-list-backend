import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {useExpressServer} from 'routing-controllers';

import {RoutesController} from './controllers/routes';
import {GlobalErrorHandler} from './global-error-handler';
import {LoggerMiddleware} from './logger';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [RoutesController],
  middlewares: [LoggerMiddleware, GlobalErrorHandler],
  defaultErrorHandler: false,
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Running on port ${port}`));
