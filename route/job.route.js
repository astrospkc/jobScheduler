import express from "express"
import Job from "../model/job.js"
import { reminderQueue } from "../queues/queues.email.js"

const router = express.Router()


// GET /jobs: This endpoint will list all available jobs, providing a comprehensive overview of the scheduled
// tasks.
// GET /jobs/:id: By accessing this endpoint with a specific job ID, users can view detailed information about
// the selected job, including its scheduling details.
// POST /jobs: This endpoint allows users to create new jobs. The API validates input data and adds the job
// to the scheduling table.

// users:
// create user : post-> /users/createUser

// send emails:
// POST /jobs/send-email: This endpoint allows users to send emails. The API validates input data and sends the email.


// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get job by id
const getJobById = async (req, res) => {
    const jobId = req.params.id;
    console.log("type: ", typeof jobId)
    try {
        const job = await Job.findById(jobId)
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteAllJobs = async (req, res) => {
    try {
        await Job.deleteMany({})
        res.status(200).json({message: "All jobs deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createJob = async (req, res) => {
    try {
        const {user_id} = req.params
        const { job_name, job_type } = req.body
        const now = new Date()
        const jobDetails = await Job.create({
            job_name: job_name,
            job_type: job_type,
            job_status: "pending",
            job_next_run: new Date(now.getTime() + 5*60*1000),
            payload: {
                user_id,
                subject: "Reminder",
                message: "reminder is set for 5 min"
            }
        })

         await reminderQueue.add("sendReminder", {
            jobId: jobDetails._id,
            user_id, 
            subject: "Reminder",
            message: "reminder is set for 5 min"
         },
             {
             delay: 5*60*1000
         })
        // console.log("addReminder: ", addReminder)
        res.status(201).json({message: "Job created successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

router.get("/", getAllJobs)
router.get("/:id", getJobById)
router.delete("/", deleteAllJobs)
router.post("/createJob/:user_id", createJob)
export default router