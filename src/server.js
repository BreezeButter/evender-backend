const server = require("./app");
const { Server } = require("socket.io");
const { Chat } = require("./models");

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
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
    socket.on("joinRoom", function (roomName) {
        socket.join(roomName);
        console.log(
            socket.rooms,
            "############################################"
        );
    });

    socket.on("sendMessage", async (input) => {
        console.log(input);
        await Chat.create({
            message: input.message,
            userId: input.userId,
            eventId: input.room,
        });
        socket.to(input.room).emit("receiveMessage", input.message);
    });

    socket.on("disconnect", () => {});
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`server running on port: ${port}`));

//#############################################################################

// const server = require("./app");
// const { Server } = require("socket.io");

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173"],
//         credentials: true,
//         methods: ["GET", "POST"],
//     },
// });

// const onlineUser = {};
// io.use((socket, next) => {
//     const userId = socket.handshake.auth.id;
//     console.log(socket.id);
//     console.log(userId);
//     onlineUser[userId] = socket.id;
//     console.log(onlineUser);
//     next();
// });

// io.on("connection", (socket) => {
//     socket.on("joinRoom", function (roomName) {
//         socket.join(roomName);
//         console.log(socket.rooms, "1");
//     });

//     socket.on("sendMessage", (input) => {
//         console.log(input);
//         socket.to(input.room).emit("receiveMessage", input.message);
//     });

//     socket.on("disconnect", () => {});
// });

// const port = process.env.PORT || 8080;
// server.listen(port, () => console.log(`server running on port: ${port}`));
