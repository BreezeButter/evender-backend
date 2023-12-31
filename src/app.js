require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const eventRoute = require("./routes/eventRoute");
const http = require("http");
const eventDetailRoute = require("./routes/eventDetailRoute");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const searchRoute = require("./routes/searchRoute");
const adminRoute = require("../src/routes/adminRoute");
const userRoute = require("./routes/user-route");
const paymentRoute = require("./routes/paymentRoute");

const app = express();
const server = http.createServer(app);

app.use(cors('*'));

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
app.use("/eventdetails", eventDetailRoute);
app.use("/search", searchRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/search", searchRoute);
app.use("/payment", paymentRoute);
//สองอันนี้ต้องอยู่ล่างสุดเสมอ
app.use(notFoundMiddleware);
app.use(errorMiddleware);
// const port = process.env.PORT || 8000;
// app.listen(port, () => console.log("server running on port " + port));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// const port = process.env.PORT || 8000;q
// app.listen(port, () => console.log("server running on port " + port));

module.exports = server;