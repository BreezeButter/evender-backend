const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("message", (message) => {
        console.log("Received message:", message);
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected.");
    });
});

httpServer.listen(3000, () => console.log("server running on port " + 3000));
