const server = require("./app");
const { Server } = require("socket.io");
const { Chat } = require("./models");

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
        methods: ["GET", "POST"],
    },
});

io.use((socket, next) => {
    // userId = socket.handshake.auth.id;
    console.log(socket.id);
    // console.log(userId);
    // onlineUser[userId] = socket.id;
    // console.log(onlineUser);
    next();
});

io.on("connection", (socket) => {
    socket.on("joinRoom", (roomName) => {
        socket.join(roomName);

        console.log(
            socket.rooms,
            "############################################"
        );
    });

    socket.on("sendMessage", async (input) => {
        console.log(socket.rooms);
        console.log(input.message);
        if (typeof input.message === "string") {
            const result = await Chat.create({
                message: input.message,
                userId: input.userId,
                eventId: input.room,
            });
            // console.log("DDDDDDDDDDDDDDDDDDD", result);
        }

        socket.to(input.room.toString()).emit("receiveMessage", input);
    });

    socket.on("disconnect", () => { });
});

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`server running on port: ${port}`));

