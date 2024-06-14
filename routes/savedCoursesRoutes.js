const express = require("express");

const { verifyAccess } = require("../middlewares/verifyAccess");
const {
  createSavedCourses,
  getAllSavedCourses,
  deleteSavedCourse,
} = require("../controllers/savedCoursesController");
const router = express.Router();

router.post("/", verifyAccess, createSavedCourses); //private route
router.get("/", verifyAccess, getAllSavedCourses); //private route
router.delete("/:id", verifyAccess, deleteSavedCourse); //private route
//todo: place verifyaccess middleware
module.exports = router;
