const User = require('../models/User');
const Course = require('../models/Course');

async function getUsers(req, res) {
    try {
        if (req.user.role !== 'Student') {
            return res.status(403).json({ message: 'Access denied: Student only' });
        }
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function registerToCourse(req, res) {
    try {
        const { courseId } = req.params; 
        const studentId = req.user.id; 

        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (student.role !== 'Student') {
            return res.status(403).json({ message: 'Access denied: Student only' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.registeredStudents.some(s => s.idNumber === student.idNumber)) {
            return res.status(400).json({ message: 'Student is already registered to this course' });
        }

        if (course.registeredStudents.length + 1 >= course.maxStudents) {
            return res.status(400).json({ message: 'Course is full' });
        }

        if ((student.creditPoints + course.creditPoints) > 20) {
            return res.status(400).json({ message: 'Student has reached the maximum credit points' });
        }

        course.registeredStudents.push({
            idNumber: student.idNumber,
            fullName: student.fullName,
        });

        course.numOfStudents = course.registeredStudents.length;

        student.registeredCourses.push({
            courseName: course.courseName,
            lecturer: course.lecturer,
            creditPoints: course.creditPoints,
        });

        student.creditPoints += course.creditPoints;

        await course.save();
        await student.save();

        res.status(200).json({
            message: 'Student successfully registered to the course',
            course: course,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getStudentCourses(req, res) {
    try {
        const studentId = req.user.id; 

        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (!student.registeredCourses || student.registeredCourses.length === 0) {
            return res.status(200).json({ message: 'No courses found for this student' });
        }

        res.status(200).json(student.registeredCourses);
    } catch (err) {
        res.status(500).json({ message: "error fetching courses", err });
    }
}

async function removeCourseFromStudent(req, res) {
    try {
        const { courseId } = req.params; 
        const studentId = req.user.id; 

        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const courseIndex = student.registeredCourses.findIndex(
            c => c.courseName === course.courseName && c.lecturer === course.lecturer
        );
        if (courseIndex === -1) {
            return res.status(400).json({ message: 'Student is not registered to this course' });
        }

        student.registeredCourses.splice(courseIndex, 1);

        student.creditPoints -= course.creditPoints;

        const studentIndex = course.registeredStudents.findIndex(
            s => s.idNumber === student.idNumber
        );
        if (studentIndex !== -1) {
            course.registeredStudents.splice(studentIndex, 1);
            course.numOfStudents = course.registeredStudents.length; 
        }

        await student.save();
        await course.save();

        res.status(200).json({
            message: 'Course successfully removed from the student',
            student: student,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getUsers,
    registerToCourse,
    getStudentCourses,
    removeCourseFromStudent,
};
