const { Router } = require('express');  
const { registerToCourse, getStudentCourses, removeCourseFromStudent } = require('../controllers/usersController.js');
const { verifyToken } = require('../controllers/authController.js');

const usersRouter = new Router();

usersRouter.post('/registerCourse/:id/:courseId', verifyToken, registerToCourse); 
usersRouter.get('/getCourses/:id', verifyToken, getStudentCourses);
usersRouter.delete('/deleteCourse/:id/:courseId', verifyToken, removeCourseFromStudent);

module.exports = { usersRouter };

