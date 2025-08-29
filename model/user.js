import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    email_id: {
        type: String,
        unique: true,
        required: true
    }
},
{
    timestamps: true
})

const User = mongoose.model("User", UserSchema)
export default User