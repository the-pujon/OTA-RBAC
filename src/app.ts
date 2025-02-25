import  httpStatus  from 'http-status';
import cors  from 'cors';
// import { express } from 'express';
import express, { Application, NextFunction, Request, Response } from 'express';
import router from './app/routes';
// import notFoundRouteHandler from './app/middlewares/notFoundRouteHandler';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
// app.use(
//   cors({
//     origin: 'http://192.168.68.105:3000',
//     credentials: true,
//   }),
// );


// app.use(
//   cors({
//     origin: [
//       process.env.FRONTEND_URL || 'http://localhost:3000', 
//       'http://192.168.68.150:3000', 
//       'http://localhost:3000',
      
//     ],
//     credentials: true,
//   })
// );


const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  /^http:\/\/192\.168\.68\.\d+:3000$/ // This will match any IP in the 192.168.68.x subnet
];

app.use(
  cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      
      // Check if the origin is allowed
      const allowed = allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return allowedOrigin === origin;
      });
      
      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

app.use(cookieParser());
//start 
app.use("/api", router);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

const notFoundRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Not Found",
  });
  next(); // Add this line to call the next middleware
};
app.use(notFoundRouteHandler);
app.use(globalErrorHandler);

export default app;