import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
    pointNum: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true,
        enum: ["roman", "greek"]
    }
});

const Point = mongoose.model("Point", pointSchema);
export default Point; 