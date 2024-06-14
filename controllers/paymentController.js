const Payments = require("../schemas/paymentSchema");
const Stripe = require("stripe");
const stripe = Stripe(process.env.PAYMENT_SK);

//@desc create payment intent
//route POST /api/payments/paymentIntent
//access private
const paymentIntent = async (req, res, next) => {
  try {
    const { price } = req.body;
    const priceInCent = Math.ceil(price * 100);

    const paymentInt = await stripe.paymentIntents.create({
      amount: priceInCent,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(201).send({
      message: "PaymentIntent created",
      data: { clientSecret: paymentInt?.client_secret },
    });
  } catch (error) {
    next(error);
  }
};

//@desc save payment info
//route POST /api/payments
//access private
const savePaymentInfo = async (req, res, next) => {
  try {
    const body = req.body;
    const paymentInfo = { ...body, user: req.user._id };
    await Payments.create(paymentInfo);
    res.status(201).send({ message: "Payment info saved" });
  } catch (error) {
    next(error);
  }
};

//@desc get all save payment info
//route GET /api/payments
//access private
const getAllPayments = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const allPayments = await Payments.find({ user: userId });

    res
      .status(200)
      .send({ message: "All payment info retrived", data: allPayments });
  } catch (error) {
    next(error);
  }
};

module.exports = { savePaymentInfo, getAllPayments, paymentIntent };
