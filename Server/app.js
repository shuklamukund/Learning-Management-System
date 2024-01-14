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
const corsOption={
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  methods:['POST','GET','PUT','DELETE'],
  
}
app.use(cors(corsOption));
  
app.use(morgan('dev'));
app.use(cookieParser());

// Server Status Check Route
app.get('/ping', (req, res) => {
    res.send('Pong');
  });


  //routes setup
import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.route.js'
import miscRoutes from './routes/miscellaneous.routes.js'
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/courses',courseRoutes);
app.use('/api/v1/payments',paymentRoutes);
app.use('/api/v1',miscRoutes);
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