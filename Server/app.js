import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectToDB from './configs/dbConnection.js';
const app = express();
connectToDB();

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


  //routes setup
  import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';
  app.use('/api/v1/user',userRoutes);
app.all('*', (req, res) => {
    res.status(404).send('OOPS!!! 404 Page Not Found');
  });

// Server Status Check Route
app.get('/ping', (req, res) => {
  res.send('Pong');
});
// Custom error handling middleware
app.use(errorMiddleware);

export default app;