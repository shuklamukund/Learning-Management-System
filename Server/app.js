import cookieParser from 'cookie-parser';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app = express();

// Middlewares
// Built-In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third-Party
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(cookieParser());

// Server Status Check Route
app.get('/ping', (req, res) => {
    res.send('Pong');
  });
  
app.all('*', (req, res) => {
    res.status(404).send('OOPS!!! 404 Page Not Found');
  });

// Server Status Check Route
app.get('/ping', (req, res) => {
  res.send('Pong');
});

export default app;