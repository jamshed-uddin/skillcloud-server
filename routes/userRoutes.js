const express = require("express");
const {
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getJwtToken,
} = require("../controllers/userControllers");

const { verifyAccess } = require("../middlewares/verifyAccess");

const router = express.Router();

router.post("/", createUser);
router.get("/:email", getSingleUser); //private route
router.post("/generateJwtToken", getJwtToken);
router.patch("/:id", updateUser); //private route
router.delete("/:id", deleteUser); //private route

//todo: place verifyaccess middleware

module.exports = router;
