import express from "express"
import Job from "../model/job.js"

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
    try {
        const job = await Job.findById(req.params.id)
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



router.get("/", getAllJobs)
router.get("/:id", getJobById)
export default router