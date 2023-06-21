const server = require("./app");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const io = new Server(server, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST"],
    },
});
instrument(io, {
    auth: false,
});
const onlineUser = {};
io.use((socket, next) => {
    const userId = socket.handshake.auth.id;
    console.log(socket.id);
    console.log(userId);
    onlineUser[userId] = socket.id;
    console.log(onlineUser);
    next();
});

io.on("connection", (socket) => {
    socket.on("join_room", function (roomName) {
        socket.join(roomName);
        console.log(socket.rooms, "1");
    });

    socket.on("sendMessage", (input) => {
        console.log(input);
        socket.to(input.room).emit("receiveMessage", input.message);
    });

    socket.on("disconnect", () => {});
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`server running on port: ${port}`));
