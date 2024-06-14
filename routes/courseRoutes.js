const express = require("express");
const {
  allCourses,
  createCourse,
  singleCourse,
  editCourse,
  deleteCourse,
  myCourses,
} = require("../controllers/courseController");
const { verifyAccess } = require("../middlewares/verifyAccess");

const router = express.Router();

router.get("/", allCourses);
router.get("/myCourses", verifyAccess, myCourses); //private route
router.post("/", verifyAccess, createCourse); //private route
router.get("/:id", singleCourse);
router.patch("/:id", verifyAccess, editCourse); //private route
router.delete("/:id", verifyAccess, deleteCourse); //private route
//todo: place verifyaccess middleware
module.exports = router;
