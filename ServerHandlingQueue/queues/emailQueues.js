import {Worker} from 'bullmq'

async function mockSendEmail(payload) {
    const { from, to, subject, body } = payload;
    return new Promise((resolve, reject) => {
      console.log(`Sending Email to ${to}....`);
      setTimeout(() => resolve(1), 2 * 1000);
    });
  }

const emailWorker = new Worker('email-Queue', async(job)=>{
    const data=job.data;
    console.log('A job Received', job.id);
    await mockSendEmail({
        from:data.from,
        to:data.to,
        subject:data.subject,
        body:data.body
    })
},
{
    connection:{
        host:'redis-37a227b7-omkarkhairnar9441-520a.a.aivencloud.com',
        port:23964,
        username:'default',
        password:'AVNS_1Dty2ovgs19kIflVoBz'
    }
}
)

export default emailWorker