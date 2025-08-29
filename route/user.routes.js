import express from "express"
import User from "../model/user.js"
import Job from "../model/job.js"
import { emailQueue } from "../queues/queues.email.js"
const router = express.Router()

const registerUser = async (req, res) => {
    try {
        const { email } = req.body 
        const newUser = await User.create({ email_id: email })
        // job info in db
        const jobDetails = await Job.create({
            job_name: "Welcome email",
            job_type: "email",
            job_status: "pending",
            job_next_run: new Date() + 10000,
            payload:{email, subject:`Welcome!` , message:`Thank you ${email} for registering to our platform`}
        })

        await emailQueue.add("sendEmail", {
            jobId: jobDetails._id,
            email,
            subject: `Welcome!`,
            message: `Thank you ${email} for registering to our platform`
        })
        res.status(201).json({message: "User registered successfully", user:newUser})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

router.post("/createUser", registerUser)
export default router