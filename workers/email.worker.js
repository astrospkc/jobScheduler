
import { Worker } from "bullmq"
import Job from "../model/job.js"
import redisConnection from "../utils/redis.js"


const worker = new Worker(
    "emailQueue",
    async (job) => {
        console.log(job)
        console.log(`Sending email to ${job.data.email_id}`)
        await Job.findByIdAndUpdate(job.data.jobId,
            {
                job_status:"completed",
                job_last_run: new Date()
            }
        )
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