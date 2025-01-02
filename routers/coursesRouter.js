const { Router } = require('express');  
const { getAllCourses, createCourse, editCourse, deleteCourse } = require('../controllers/coursesController.js');
const { verifyToken } = require('../controllers/authController.js');

const coursesRouter = new Router();

coursesRouter.get('/', verifyToken, getAllCourses);
coursesRouter.post('/', verifyToken, createCourse);
coursesRouter.put('/editCourse/:id', verifyToken, editCourse);
coursesRouter.delete('/deleteCourse/:id', verifyToken, deleteCourse);

module.exports = { coursesRouter }; 


