import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {Container} from 'typedi';
import {useExpressServer, useContainer} from 'routing-controllers';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

useContainer(Container);

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [__dirname + '/controllers/*.ts'],
  middlewares: [__dirname + '/middlewares/*.ts'],
  defaultErrorHandler: false,
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Running on port ${port}`));
