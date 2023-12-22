import Course from '../models/course.model.js'
import AppError from '../utils/error.util.js';

const getAllCourses=async(req,res,next)=>{
    
        // Find all the courses without lectures
        const courses = await Course.find({}).select('-lectures');

        res.status(200).json({
        success: true,
        message: 'All courses',
        courses,
        });
    
}

const getLecturesByCourseId=async(req,res,next)=>{
    const { id } = req.params;

    const course = await Course.findById(id);
  
    if (!course) {
      return next(new AppError('Invalid course id or course not found.', 404));
    }
  
    res.status(200).json({
      success: true,
      message: 'Course lectures fetched successfully',
      lectures: course.lectures,
    });
}

export {
    getAllCourses,
    getLecturesByCourseId
}