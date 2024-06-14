const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const savedCoursesRoutes = require("./routes/savedCoursesRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrolledCoursesRoutes = require("./routes/enrolledCourseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const connectDb = require("./configs/connectDb");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.get("/", async (req, res) => {
  res.send("welcome to the skillSwap  server");
});

// api routers
app.use("/api/user", userRoutes);
app.use("/api/savedCourses", savedCoursesRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrolledCourses", enrolledCoursesRoutes);
app.use("/api/payments", paymentRoutes);

//error handler mids
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
