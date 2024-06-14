const courseSchema = require("../schemas/courseSchema");
const Course = require("../schemas/courseSchema");
const customError = require("../utils/customError");

//@desc create courses
//route POST /api/courses
//access private
const createCourse = async (req, res, next) => {
  try {
    const body = req.body;

    const courseInfo = {
      ...body,
      instructor: req.user._id,
    };

    const createdCourse = await Course.create(courseInfo);

    res
      .status(201)
      .send({ message: "Course created successfully", data: createdCourse });
  } catch (error) {
    next(error);
  }
};

//@desc get all courses
//route GET /api/courses
//access public
const allCourses = async (req, res, next) => {
  try {
    const allCourses = await Course.find().populate("instructor");
    res.status(200).send({ message: "All courses retrived", data: allCourses });
  } catch (error) {
    next(error);
  }
};
//@desc get all my courses
//route GET /api/courses/myCourses
//access public
const myCourses = async (req, res, next) => {
  try {
    const userId = req.user._id.toHexString();

    const myCourses = await Course.find({ instructor: userId }).populate(
      "instructor"
    );

    res.status(200).send({ message: "Courses retrived", data: myCourses });
  } catch (error) {
    next(error);
  }
};

//@desc get single course
//route GET /api/courses/:id
//access public
const singleCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({ _id: id }).populate("instructor");
    if (!course) {
      throw customError(404, "Course not found");
    }

    res
      .status(200)
      .send({ message: "Single course data retrived", data: course });
  } catch (error) {
    next(error);
  }
};

//@desc edit course
//route PATCH /api/courses/:id
//access private
const editCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const updatingCourse = req.body;
    const { instructor } = req.body;

    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      throw customError(404, "Course not found");
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      updatingCourse,
      { new: true }
    );

    res
      .status(200)
      .send({ message: "Course updated successfully", _id: updatedCourse._id });
    //_id here just to redirect user to course detail page
  } catch (error) {
    next(error);
  }
};

//@desc deelte course
//route DELETE /api/courses/:id
//access public
const deleteCourse = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const courseId = req.params.id;

    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      throw customError(404, "Course not found");
    } else if (course.instructor.toHexString() !== userId.toHexString()) {
      throw customError(406, "Action not allowed");
    }

    await Course.deleteOne({ _id: courseId });
    res.status(200).send({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allCourses,
  myCourses,
  createCourse,
  singleCourse,
  editCourse,
  deleteCourse,
};
