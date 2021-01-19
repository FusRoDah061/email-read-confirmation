import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import './container';
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errors());
app.use(routes);

// Heroku specific configuration
app.enable('trust proxy');

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
