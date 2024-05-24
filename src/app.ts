import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import { TripRoutes } from './app/modules/trip/trip.routes';
import { TravelRoutes } from './app/modules/travel/travel.routes';
const app:Application=express();

app.use(cors({origin:"http://localhost:3000",credentials:true}));
// parser
app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
    res.send('Hello user!')
})

app.use('/api',UserRoutes)
app.use('/api',AuthRoutes)
app.use('/api',TripRoutes)
app.use('/api',TravelRoutes)
app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;