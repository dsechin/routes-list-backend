import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {Container} from 'typedi';
import {useExpressServer, useContainer} from 'routing-controllers';

import * as log4js from 'log4js'

log4js.configure({
  appenders: { out: { type: 'stdout', layout: { type: 'coloured' } } },
  categories: { default: { appenders: ['out'], level: 'info' } }
})

const logger = log4js.getLogger('default');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
  log4js.connectLogger(
    logger,
    {
      level: log4js.levels.INFO.levelStr,
      format: (req, res, format) => format(`:remote-addr :method :url ${JSON.stringify(req.body)}`),
    },
  ),
);

useContainer(Container);

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [
    __dirname + '/controllers/*.ts', // dev
    __dirname + '/controllers/*.js', // prod
  ],
  middlewares: [
    __dirname + '/middlewares/*.ts', // dev
    __dirname + '/controllers/*.js', // prod
  ],
  defaultErrorHandler: false,
});

const port = process.env.PORT || 3333;

app.listen(port, () => logger.info(`Running on port ${port}`));
