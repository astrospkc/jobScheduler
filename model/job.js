import mongoose from "mongoose";


// The database should contain fields such as job name, last run timestamp, next run timestamp, and other
// pertinent job details.

const jobSchema = new mongoose.Schema({
    job_name: {
        type: String,
        required: true
    },
    job_type: {
        type: String,
        required: true
    },
    job_status: {
        type: String,
        required: true
    },
    job_last_run: {
        type: Date,
        
    },
    job_next_run: {
        type: Date,
        
    },
    payload: {
        type: Object,
        required: true
    }
},
    {
        timestamps: true
    }
)

const Job = mongoose.model("Job", jobSchema)

export default Job
