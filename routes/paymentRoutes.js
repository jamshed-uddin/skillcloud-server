const express = require("express");
const {
  savePaymentInfo,
  getAllPayments,
  paymentIntent,
} = require("../controllers/paymentController");
const { verifyAccess } = require("../middlewares/verifyAccess");
const router = express.Router();

// api/payments/

router.post("/paymentIntent", verifyAccess, paymentIntent); //private route
router.post("/", verifyAccess, savePaymentInfo); //private route
router.get("/", verifyAccess, getAllPayments); //private route
//todo: place verifyaccess middleware
module.exports = router;
