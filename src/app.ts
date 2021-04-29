import 'reflect-metadata';
import express from 'express'
import dotenv from 'dotenv';
import { useExpressServer } from 'routing-controllers';

import { RoutesController } from './controllers/Routes';

const app = express();

dotenv.config();

app.use(express.json());
// app.use(httpContext.middleware);
useExpressServer(app, {
  routePrefix: '/api',
  controllers: [RoutesController]
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Running on port ${port}`));
