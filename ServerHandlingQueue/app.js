import express from 'express';
import emailWorker from './queues/emailQueues.js'
const app=express();
const PORT=5001; 





app.listen(PORT, ()=>{
    console.log(`Backend App listening at http://localhost:${PORT}`);
})