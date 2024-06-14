const express = require("express");
const {
  createEnrolledCourses,
  getAllEnrolledCourses,
} = require("../controllers/enrolledCourseController");
const { verifyAccess } = require("../middlewares/verifyAccess");
const router = express.Router();

router.post("/", verifyAccess, createEnrolledCourses); //private route
router.get("/", verifyAccess, getAllEnrolledCourses); //private route
//todo: place verifyaccess middleware
module.exports = router;
