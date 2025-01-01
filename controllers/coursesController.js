const Course = require('../models/Course');

async function getCourses(req, res) {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getCourses
};