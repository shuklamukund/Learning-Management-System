import Course from '../models/course.model.js'
import AppError from '../utils/error.util.js';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
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

const createCourse=async(req,res,next)=>{
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError('All fields are required', 400));
    }
  
    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail:{
        public_id:'dummy',
        secure_url:'dummy',
      },
    });
  
    if (!course) {
      return next(
        new AppError('Course could not be created, please try again', 400)
      );
    }
  
    // Run only if user sends a file
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'lms', // Save files in a folder named lms
        });
  
        // If success
        if (result) {
          // Set the public_id and secure_url in array
          course.thumbnail.public_id = result.public_id;
          course.thumbnail.secure_url = result.secure_url;
        }
  
        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        // Empty the uploads directory without deleting the uploads directory
        for (const file of await fs.readdir('uploads/')) {
          await fs.unlink(path.join('uploads/', file));
        }
  
        // Send the error message
        return next(
          new AppError(
            JSON.stringify(error) || 'File not uploaded, please try again',
            400
          )
        );
      }
    }
  
    // Save the changes
    await course.save();
  
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
}

const updateCourse=async(req,res)=>{
  // Extracting the course id from the request params
  const { id } = req.params;

  // Finding the course using the course id
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: req.body, // This will only update the fields which are present
    },
    {
      runValidators: true, // This will run the validation checks on the new data
    }
  );

  // If no course found then send the response for the same
  if (!course) {
    return next(new AppError('Invalid course id or course not found.', 400));
  }

  // Sending the response after success
  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
  });
}

const removeCourse=async(req,res)=>{
  // Extracting id from the request parameters
  const { id } = req.params;

  // Finding the course via the course ID
  const course = await Course.findById(id);

  // If course not find send the message as stated below
  if (!course) {
    return next(new AppError('Course with given id does not exist.', 404));
  }

  // Remove course
  await Course.findByIdAndDelete(id);

  // Send the message as response
  res.status(200).json({
    success: true,
    message: 'Course deleted successfully',
  });
}

const addLectureToCourseById=async(req,res,next)=>{
    const { title, description } = req.body;
    const { id } = req.params;
  
    let lectureData = {
        title,
        description,
        lecture:{},
    };
  
    if (!title || !description) {
      return next(new AppError('Title and Description are required', 400));
    }
  
    const course = await Course.findById(id);
  
    if (!course) {
      return next(new AppError('Invalid course id or course not found.', 400));
    }
  
    // Run only if user sends a file
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'lms', // Save files in a folder named lms
          
        });
  
        // If success
        if (result) {
          // Set the public_id and secure_url in array
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
        }
  
        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        // Empty the uploads directory without deleting the uploads directory
        for (const file of await fs.readdir('uploads/')) {
          await fs.unlink(path.join('uploads/', file));
        }
  
        // Send the error message
        return next(
          new AppError(
            JSON.stringify(error) || 'File not uploaded, please try again',
            400
          )
        );
      }
    }
  
    course.lectures.push(lectureData);
  
    course.numberOfLectures = course.lectures.length;
  
    // Save the course object
    await course.save();
  
    res.status(200).json({
      success: true,
      message: 'Course lecture added successfully',
      course,
    });
}

const removeLectureFromCourse=async(req,res,next)=>{
      // Grabbing the courseId and lectureId from req.query
  const { courseId, lectureId } = req.query;

  console.log(courseId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  if (!lectureId) {
    return next(new AppError('Lecture ID is required', 400));
  }

  // Find the course uding the courseId
  const course = await Course.findById(courseId);

  // If no course send custom message
  if (!course) {
    return next(new AppError('Invalid ID or Course does not exist.', 404));
  }

  // Find the index of the lecture using the lectureId
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture.id.toString() === lectureId.toString()
  );

  // If returned index is -1 then send error as mentioned below
  if (lectureIndex === -1) {
    return next(new AppError('Lecture does not exist.', 404));
  }

  // Delete the lecture from cloudinary
  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id
    
  );

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectures array length
  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: 'Course lecture removed successfully',
  });
}

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
    removeLectureFromCourse
}