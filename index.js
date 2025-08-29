import express from "express"
import jobRouter from "./route/job.route.js"
import userRouter from "./route/user.routes.js"
import connectDB from "./utils/mongoConnect.js"
import dotenv from "dotenv";
dotenv.config();
const app = express()
connectDB()

app.use(express.json())

app.use("/api/jobs", jobRouter)
app.use("/api/users", userRouter)

app.listen(3000, () => {
    console.log("Server started on port 3000")
})