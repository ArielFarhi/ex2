const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    courseName: { type: String, required: true },
    lecturer: { type: String, required: true },
    creditPoints: { type: Number, required: true },
    maxStudents: { type: Number, required: true },
    registeredStudents: [{ type: String, ref: "Student" }], 
    numOfStudents: { type: Number, default: 0 },
}, { collection: "courses" });


const Course = model("Course", courseSchema);

module.exports = Course;
