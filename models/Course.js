const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    courseName: { type: String, required: true },
    lecturer: { type: String, required: true },
    creditPoints: { type: Number, required: true, min: 3, max: 5 },
    maxStudents: { type: Number, required: true },
    registeredStudents: [
        {
            idNumber: { type: String, required: true },
            fullName: { type: String, required: true },
        }
    ],
    numOfStudents: { type: Number, default: 0 },
}, { collection: "courses" });

courseSchema.pre("save", function (next) {
    if (this.registeredStudents.length > this.maxStudents) {
        return next(new Error("Number of registered students exceeds the maximum allowed"));
    }
    next();
});

const Course = model("Course", courseSchema);

module.exports = Course;
