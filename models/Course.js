const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    courseName: { type: String, required: true },
    lecturer: { type: String, required: true },
    creditPoints: { type: Number, required: true, min: 3, max: 5 },
    maxStudents: { type: Number, required: true },
    registeredStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { collection: "courses" });


const Course = model("Course", courseSchema);

module.exports = Course;
