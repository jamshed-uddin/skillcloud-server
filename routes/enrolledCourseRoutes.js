const express = require("express");
const {
  createEnrolledCourses,
  getAllEnrolledCourses,
} = require("../controllers/enrolledCourseController");
const router = express.Router();

router.post("/", createEnrolledCourses); //private route
router.get("/", getAllEnrolledCourses); //private route
//todo: place verifyaccess middleware
module.exports = router;
