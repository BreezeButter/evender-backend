require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const eventRoute = require("./routes/eventRoute");
const eventDetailRoute = require("./routes/eventDetailRoute");
const authRoute = require("./routes/auth-route");
const searchRoute = require("./routes/searchRoute");
<<<<<<< HEAD
const eventRoute = require("./routes/eventRoute");
// const notFoundMiddleware = require("./middlewares/notFound");
// const errorMiddleware = require("./middlewares/error");
// const authRoute = require("./routes/auth-route");
// const searchRoute = require("./routes/searchRoute");
=======
>>>>>>> 018f79c3c24247357257db1e2d57a6c467a0b04a
const userRoute = require("./routes/user-route");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(
    rateLimit({
        windowMs: 1000 * 60 * 1,
        max: 1000,
        message: { message: "too many requests" },
    })
);

app.use(helmet());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/event", eventRoute);
// app.use("/eventdetails", eventDetailRoute);
app.use("/search", searchRoute);
app.use("/user", userRoute);

<<<<<<< HEAD
app.use("/user", userRoute);

// app.use(notFoundMiddleware);
// app.use(errorMiddleware);
app.use("/search", searchRoute);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
=======
// app.use(notFoundMiddleware);
// app.use(errorMiddleware);
>>>>>>> 018f79c3c24247357257db1e2d57a6c467a0b04a

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server running on port " + port));
