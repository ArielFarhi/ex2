const Course = require('../models/Course');

async function getAllCourses(req, res) {
    try {
        if (req.user.role !== 'Staff') {
            return res.status(403).json({ message: 'Access denied: Staff only' });
        }

        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
    }
}

async function createCourse(req, res) {
    try {
        if (req.user.role !== 'Staff') {
            return res.status(403).json({ message: 'Access denied: Staff only' });
        }
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create course', error: error.message });
    }
}

async function editCourse(req, res) {
    try {
        if (req.user.role !== 'Staff') {
            return res.status(403).json({ message: 'Access denied: Staff only' });
        }

        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.set(req.body);
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Failed to edit course', error: error.message });
    }
}

async function deleteCourse(req, res) {
    try {
        if (req.user.role !== 'Staff') {
            return res.status(403).json({ message: 'Access denied: Staff only' });
        }

        const courseId = req.params.id;
        const course = await Course.findByIdAndDelete(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete course', error: error.message });
    }
}

module.exports = {
    getAllCourses,
    createCourse,
    editCourse,
    deleteCourse,
};