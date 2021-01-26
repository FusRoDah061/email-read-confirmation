import 'reflect-metadata';
import 'dotenv/config';
import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import './container';
import routes from './routes';
import AppError from './error/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'assets')));
app.use(routes);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    console.error(err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        statusCode: err.statusCode,
        error: 'Bad Request',
        message: err.message,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: '',
    });
  },
);

// Heroku specific configuration
app.enable('trust proxy');

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
