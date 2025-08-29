
import { Worker } from "bullmq"
import Job from "../model/job.js"
import redisConnection from "../utils/redis.js"
import dotenv from "dotenv";
dotenv.config();

import connectDB from "../utils/mongoConnect.js"
connectDB()


const worker = new Worker(
    "emailQueue",
    async (job) => {
        // console.log(job)
        console.log(`Sending email to ${job.data.email}`)
        console.log(" job id: ", job.data.jobId, typeof job.data.jobId)

        const jobDoc = await Job.findById(job.data.jobId);
        console.log(" job doc: ", jobDoc)
    if (jobDoc) {
        jobDoc.job_status = "completed";
        jobDoc.job_last_run = new Date();
        await jobDoc.save();
    }
    },
    {
        connection:redisConnection
    }
)

const reminderWorker = new Worker(
    "reminderQueue",
    async (job) => {
        console.log(`Sending reminder to ${job.data.user_id}`)
        console.log(" job id: ", job.data.jobId, typeof job.data.jobId)

        const jobDoc = await Job.findById(job.data.jobId);
        console.log(" job doc: ", jobDoc)
        if (jobDoc) {
            jobDoc.job_status = "completed";
            jobDoc.job_last_run = new Date();
            jobDoc.job_next_run = new Date(jobDoc.job_next_run.getTime() + 5*60*1000);
            await jobDoc.save();
        }
    },
    {
        connection:redisConnection
    }
)

worker.on("failed", async (job, error) => {
     console.error(`Job failed: ${job?.id}`, error);
     if (job?.data.jobId) {
        await Job.findByIdAndUpdate(job.data.jobId, { job_status: "failed" });
     }
})

reminderWorker.on("failed", async (job, error) => {
     console.error(`Job failed: ${job?.id}`, error);
     if (job?.data.jobId) {
        await Job.findByIdAndUpdate(job.data.jobId, { job_status: "failed" });
     }
})