import express from 'express'
import 'dotenv/config';
import cors from 'cors';


// Instance of application is created
const app=express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/',(req,res)=>{
    res.send('work');
})

// Fetching data from `.env` to `process.env`
const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at PORT: ${PORT}`);
})

export default app;