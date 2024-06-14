const SavedCourses = require("../schemas/savedCoursesSchema");
const customError = require("../utils/customError");

//@desc create saved item
//route POST/api/savedCoures
//access private

const createSavedCourses = async (req, res, next) => {
  try {
    const body = req.body;

    const savedItem = await SavedCourses.findOne({
      userId: req.user._id,
      course: body.course, //course here is course id
    });

    if (savedItem) {
      throw customError(409, "course already saved");
    }

    await SavedCourses.create({ ...body, userId: req.user._id });

    res.status(201).send({
      message: "course saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

//@desc get all SavedCourses userwise SavedCourses
//route GET /api/savedCoures
//access private

const getAllSavedCourses = async (req, res, next) => {
  try {
    const id = req.user._id;

    const mySavedCourses = await SavedCourses.find({ userId: id }).populate(
      "course"
    );

    res.status(200).send({
      message: "Saved courses retrived",
      data: mySavedCourses?.map((savedCourse) => savedCourse.course),
    });
  } catch (error) {
    next(error);
  }
};
//@desc delete SavedCourse
//route DELETE /api/savedCoures/:id  id here is course id
//access private

const deleteSavedCourse = async (req, res, next) => {
  try {
    const id = req.params.id;

    await SavedCourses.deleteOne({ course: id }, { user: req.user._id });

    res.status(200).send({
      message: "Saved course deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSavedCourses,
  getAllSavedCourses,
  deleteSavedCourse,
};
