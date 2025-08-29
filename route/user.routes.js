import express from "express"
import User from "../model/user.js"
import Job from "../model/job.js"
import { emailQueue } from "../queues/queues.email.js"
import { now } from "mongoose"
const router = express.Router()

const registerUser = async (req, res) => {
    try {
        const { email } = req.body 
        const newUser = await User.create({ email_id: email })
        // job info in db
        // const now = new Date()
        const jobDetails = await Job.create({
            job_name: "Welcome email",
            job_type: "email",
            job_status: "pending",
            job_next_run: null,
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

const deleteAllUser = async (req, res) => {
    try {
        await User.deleteMany({})
        res.status(200).json({message: "All users deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

router.get("/getAllUsers", getAllUsers)
router.post("/createUser", registerUser)
router.delete("/deleteAllUser", deleteAllUser)
export default router