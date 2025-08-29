import mongoose from "mongoose";
const ActionSchema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    }
},
    {
    timestamps:true
}
)

const Action = mongoose.model("Action", ActionSchema)
export default Action