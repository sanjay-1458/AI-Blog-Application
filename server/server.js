import express from 'express'
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import adminRouter from './routes/adminRoute.js';
import blogRouter from './routes/blogRoutes.js';


// Instance of application is created
const app=express();


// Connection for MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/',(req,res)=>{
    res.send('work');
})

app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter)


// Fetching data from `.env` to `process.env`
const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at PORT: ${PORT}`);
})

export default app;