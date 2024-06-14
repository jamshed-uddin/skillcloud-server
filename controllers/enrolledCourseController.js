const { populate } = require("dotenv");
const EnrolledCourses = require("../schemas/enrolledCourseSchema");
const customError = require("../utils/customError");

//@desc create enrolled course
//route POST/api/enrolledCourses
//access private

const createEnrolledCourses = async (req, res, next) => {
  try {
    const body = req.body;

    const enrolledCourse = await EnrolledCourses.findOne({
      userId: req.user._id,
      course: body.course,
    });

    if (enrolledCourse) {
      throw customError(409, "course already enrolled");
    }

    await EnrolledCourses.create({ ...body, userId: req.user._id });

    res.status(201).send({
      message: "course enrolled successfully",
    });
  } catch (error) {
    next(error);
  }
};

//@desc get all enrolled courses userwise enrolled courses
//route GET /api/enrolledCourses   id here is userId
//access private

const getAllEnrolledCourses = async (req, res, next) => {
  try {
    const id = req.user._id;

    const enrolledCourses = await EnrolledCourses.find({ userId: id }).populate(
      {
        path: "course",
        populate: {
          path: "instructor",
          model: "User",
        },
      }
    );

    res.status(200).send({
      message: "enrolled courses retrived",
      data: enrolledCourses?.map((enrolledCourse) => enrolledCourse.course),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnrolledCourses,
  getAllEnrolledCourses,
};
