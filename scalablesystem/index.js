import express from 'express'
import {Queue} from 'bullmq'
import addUserToCourse from './src/utils/course.js'
import mockSendEmail from './src/utils/email.js'

const app=express();
const PORT=5000; 

const emailQueue=new Queue('email-Queue',{
    connection:{
        host:'redis-37a227b7-omkarkhairnar9441-520a.a.aivencloud.com',
        port:23964,
        username:'default',
        password:'AVNS_1Dty2ovgs19kIflVoBz'
    }
})

app.get('/', (req, res)=>{
    return res.json({
        "status":"success",
        "message":"Welcome To Server"
    })
})

app.get('/add-user-to-course', async(req, res)=>{
    console.log("Adding User To Course");
    await addUserToCourse(); // Critical Section for giving acess of course to User
// Non-Critical Section of Sending : which delays the server to give access to the user    
    // await mockSendEmail({
    //     from: "omkarkhairnar9441@gmail.com",
    //     to: "student@gmail.com",
    //     subject: "Congrats on enrolling in Twitter Course",
    //     body: "Dear Student, You have been enrolled to Twitter Clone Course.",
    // })
    
    await emailQueue.add(`${Date.now()}`, {
        from: "omkarkhairnar9441@gmail.com",
        to: "student@gmail.com",
        subject: "Congrats on enrolling in Twitter Course",
        body: "Dear Student, You have been enrolled to Twitter Clone Course.",
    })
    return res.json({
        status:'success',
        data:{
            message:'Enrolled for the course'
        }
    })
})




app.listen(PORT, ()=>{
    console.log(`Backend App listening at http://localhost:${PORT}`);
})